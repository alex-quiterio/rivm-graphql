import { Module } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { IndicatorResolver } from './indicator.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicator } from './indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Indicator])],
  providers: [IndicatorService, IndicatorResolver]
})
export class IndicatorModule {}
