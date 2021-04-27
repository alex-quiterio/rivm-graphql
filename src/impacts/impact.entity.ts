import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "../entries/entry.entity";
import { Indicator } from "../indicator/indicator.entity";

@Entity()
@ObjectType()
export class Impact {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: Number;

  @Column({ type: "float"})
  @Field(type => Float)
  coefficient: Number;

  @Column()
  entryId: number;

  @ManyToOne(() => Entry, entry => entry.impacts, { eager: true })
  @Field(type => Entry)
  entry: Entry;

  @ManyToOne(() => Indicator, indicator => indicator.impacts, { eager: true })
  @Field(type => Indicator)
  indicator: Indicator;

  @Column()
  indicatorId: number;
}
