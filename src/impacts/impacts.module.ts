import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Impact } from './impact.entity';
import { ImpactsResolver } from './impacts.resolver';
import { ImpactsService } from './impacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Impact])],
  providers: [ImpactsService, ImpactsResolver],
  exports: [ImpactsService],
})
export class ImpactsModule {}
