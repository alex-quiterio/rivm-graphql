import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Entry } from './entry.entity';
import { EntriesService } from './entries.service';
import { Impact } from '../impacts/impact.entity';

@Resolver(of => Entry)
export class EntriesResolver {
  constructor(private entriesService: EntriesService) {}

  @Query(returns => [Entry])
  async entries(): Promise<Entry[]> {
    return this.entriesService.findAll(); 
  }

  @Query(returns => Entry)
  async entry(@Args('id', { type: () => Int }) id: number): Promise<Entry> {
    return this.entriesService.findOne(id);
  }

  @ResolveField(returns => Impact)
  async impact(
    @Args('indicatorId', { type: () => Int }) indicatorId: number, 
    @Parent() entry: Entry
  ): Promise<Impact> {
    return this.entriesService.findImpactByIndicatorIdAndEntryId(indicatorId, entry.id)
  }
}
