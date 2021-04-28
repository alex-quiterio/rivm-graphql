import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Indicator } from './indicator.entity';
import { IndicatorService } from './indicator.service';

@Resolver(() => Indicator)
export class IndicatorResolver {
  constructor(private indicatorsService: IndicatorService) {}

  @Query(() => [Indicator])
  async indicators(): Promise<Indicator[]> {
    return this.indicatorsService.findAll();
  }

  @Query(() => Indicator)
  async indicator(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Indicator> {
    return this.indicatorsService.findOne(id);
  }
}
