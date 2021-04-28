import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicator } from './indicator.entity';

@Injectable()
export class IndicatorService {
  constructor(
    @InjectRepository(Indicator)
    private readonly indicatorsRepository: Repository<Indicator>,
  ) {}

  async findAll(): Promise<Indicator[]> {
    return this.indicatorsRepository.find();
  }

  async findOne(id: number): Promise<Indicator> {
    return this.indicatorsRepository.findOne(id);
  }
}
