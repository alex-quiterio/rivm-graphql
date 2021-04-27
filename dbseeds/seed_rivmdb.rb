#!/usr/bin/env ruby

require 'csv'
require 'json'

filename = ARGV[0] || 'dbseeds/rivm2016.csv'
seed_file_name = 'dbseeds/rivmseeds.sql'
db_container_name = 'rivmdb'
db_config = JSON.parse(File.read('ormconfig.json'))

def normalize_indicator(id, indicator_data)
  metadata, unit = *indicator_data
  method, category, indicator_name = metadata.split(":")
  
  {
    id: id,
    definition: metadata,
    method: method,
    category: category,
    indicatorName: indicator_name,
    unit: unit
  }
end

def normalize_entry(id, entry, definitions)
  fixed_entry = [(a = entry['Ecoinvent process OR other names'].split(/,\s\[/)).first, a.last.split(', ')].flatten
  product_name, geography_code, method, data_source = fixed_entry
  
  {
    id: id,
    dataSource: entry['Data source'],
    geographyCode: geography_code.gsub(/\]/, ''),
    productName: product_name,
    unit: entry['Unit'],
    impacts: extract_impacts_from_entry(entry.compact, definitions)
  }
end

def extract_impacts_from_entry(entry, definitions)
  entry_indicator_keys = entry.keys.filter do |indicator_key|
    indicator_key.match(Regexp.union(definitions))
  end

  entry_indicator_keys.map do |key|
    {
      key: key,
      value: entry[key]
    }
  end
end

def as_integer(value); value.to_i; end
def as_float(value); value.to_f; end
def as_string(value); value.dump; end

def insert_sql_command_for(table_name, values)
  insert_command = case table_name
  when :indicator
    'INSERT INTO indicator (id, method, category, indicatorName, unit) VALUES '
  when :entry
    'INSERT INTO entry (id, productName, unit, geographyCode) VALUES '
  when :impact
    'INSERT INTO impact (id, coefficient, entryId, indicatorId) VALUES '
  end
    
  insert_command.concat("(#{values.map { |v| v.join(',') }.join('),(')});\n")
end

def write_sql_file(file_name, indicators, entries)
  grouped_indicators = indicators.group_by { |i| i[:definition] }

  File.open(file_name, 'w') do |file|
    file << insert_sql_command_for(:indicator, indicators.map { |indicator|
      [
        as_integer(indicator[:id]),  
        as_string(indicator[:method]), 
        as_string(indicator[:category]), 
        as_string(indicator[:indicatorName]), 
        as_string(indicator[:unit])
      ]
    })

    file << insert_sql_command_for(:entry, entries.map { |entry|
      [
        as_integer(entry[:id]),
        as_string(entry[:productName]),
        as_string(entry[:unit]),
        as_string(entry[:geographyCode])
      ]
    })

    impact_id = 0
    file << insert_sql_command_for(:impact, entries.flat_map { |entry|
      entry[:impacts].map { |impact|
        impact_id +=1
        [
          as_integer(impact_id),
          as_float(impact[:value]),
          as_integer(entry[:id]),
          as_integer(grouped_indicators[impact[:key]].first[:id])
        ]
      }
    })
  end
end

csv_rows = []
CSV.foreach(filename, quote_char: '"', col_sep: ',', row_sep: :auto, headers: true) do |row|
  csv_rows << row
end

csv_indicators = csv_rows.shift.to_h.compact.map.with_index do |indicator_data, index|
  normalize_indicator(index+1, indicator_data)
end.compact

csv_entries = csv_rows.map.with_index { |entry, idx| normalize_entry(idx+1, entry.to_h, csv_indicators.map { |i| i[:definition] }) }.compact

write_sql_file(seed_file_name, csv_indicators, csv_entries)

puts "Seeding database"
begin 
  system("docker-compose exec #{db_container_name} /bin/bash -c 'mysql -u#{db_config['username']} -p#{db_config['password']} #{db_config['database']} < #{seed_file_name}'")
ensure
  system("rm -rf #{seed_file_name}")
end