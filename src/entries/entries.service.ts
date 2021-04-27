import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entry.entity';
import { Impact } from '../impacts/impact.entity';
import { ImpactsService } from '../impacts/impacts.service';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private readonly entriesRepository: Repository<Entry>,
    private impactsService: ImpactsService
  ) {}

  async findAll(): Promise<Entry[]> {
    return this.entriesRepository.find();
  }

  async findOne(id: number): Promise<Entry> {
    return this.entriesRepository.findOne(id);
  }

  async findImpactByIndicatorIdAndEntryId(indicatorId: number, entryId: number): Promise<Impact> {
    return this.impactsService.findByIndicatorAndEntry(entryId, indicatorId);
  }
}
