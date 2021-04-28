import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entry } from '../entries/entry.entity';
import { Indicator } from '../indicator/indicator.entity';

@Entity()
@ObjectType()
export class Impact {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  coefficient: number;

  @Column()
  entryId: number;

  @ManyToOne(() => Entry, (entry) => entry.impacts, { eager: true })
  @Field(() => Entry)
  entry: Entry;

  @ManyToOne(() => Indicator, (indicator) => indicator.impacts, { eager: true })
  @Field(() => Indicator)
  indicator: Indicator;

  @Column()
  indicatorId: number;
}
