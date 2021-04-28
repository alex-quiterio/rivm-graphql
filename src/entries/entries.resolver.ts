import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Entry } from './entry.entity';
import { EntriesService } from './entries.service';
import { Impact } from '../impacts/impact.entity';

@Resolver(() => Entry)
export class EntriesResolver {
  constructor(private entriesService: EntriesService) {}

  @Query(() => [Entry])
  async entries(): Promise<Entry[]> {
    return this.entriesService.findAll();
  }

  @Query(() => Entry)
  async entry(@Args('id', { type: () => Int }) id: number): Promise<Entry> {
    return this.entriesService.findOne(id);
  }

  @ResolveField(() => Impact)
  async impact(
    @Args('indicatorId', { type: () => Int }) indicatorId: number,
    @Parent() entry: Entry,
  ): Promise<Impact> {
    return this.entriesService.findImpactByIndicatorIdAndEntryId(
      indicatorId,
      entry.id,
    );
  }
}
