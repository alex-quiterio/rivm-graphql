import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Impact } from "../impacts/impact.entity";

@Entity()
@ObjectType()
export class Indicator {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column('varchar', { length: 255})
  @Field()
  method: string;

  @Column('varchar', { length: 255})
  @Field()
  category: string;
  
  @Column()
  @Field()
  indicatorName: string;

  @Column('varchar', { length: 50})
  @Field()
  unit: string;

  @OneToMany(() => Impact, impact => impact.entry)
  impacts: Impact[];
}