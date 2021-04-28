import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndicatorModule } from './indicator/indicator.module';
import { EntriesModule } from './entries/entries.module';
import { ImpactsModule } from './impacts/impacts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    IndicatorModule,
    EntriesModule,
    ImpactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
