import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Impact } from './impact.entity';
import { ImpactsService } from './impacts.service';

@Resolver(of => Impact)
export class ImpactsResolver {
  constructor(private impactsService: ImpactsService) {}

  @Query(returns => Impact)
  async impact(
    @Args('entryID', { type: () => Int }) entryId: number, 
    @Args('indicatorID', { type: () => Int }) indicatorId: number,
  ): Promise<Impact> {
    return this.impactsService.findByIndicatorAndEntry(entryId, indicatorId);
  }
}
