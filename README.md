# Setup & execute the project
An exploration with rivm data using graphql...

# dependencies
bundler, node, ruby, docker, yarn

# Follow the next instructions to setup the project: 

1. Install code dependencies
$ yarn run install
$ bundle install

2. Start the db server
$ docker-compose up

3. Synchronise the schema with the database
$ yarn run schema:sync && yarn run db:seed


# Start the service
$ yarn run start:dev

Visit http://localhost:3000/graphql and try the following queries:

```
# the list of indicators
{
 indicators {
    indicatorName
    method
    category
  }
}
# a list of entries for indicator 13 (indicatorName: GWP100)
{
 entries {
    productName
    unit
    geographyCode
  	impact(indicatorId: 13) {
      coefficient
      indicator {
        indicatorName
        method
        category
      }
    }
  }
}
```
## TODOs
- [ ] Improve N+1 queries for the entry resolver
