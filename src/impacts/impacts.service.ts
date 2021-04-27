import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Impact } from './impact.entity';

@Injectable()
export class ImpactsService {
  constructor (@InjectRepository(Impact) private readonly impactsRepository: Repository<Impact>) {}

  async findByIndicatorAndEntry(entryId: number, indicatorId: number): Promise<Impact> {
    return this.impactsRepository.findOne({where: {entryId, indicatorId}});
  }
}
