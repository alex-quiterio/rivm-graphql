import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { ImpactsModule } from '../impacts/impacts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), ImpactsModule],
  providers: [EntriesService, EntriesResolver],
})
export class EntriesModule {}
