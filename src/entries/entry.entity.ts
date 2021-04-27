import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Impact } from "../impacts/impact.entity";

@Entity()
@ObjectType()
export class Entry {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column('varchar', { length: 255})
  @Field()
  productName: string;

  @Column('varchar', { length: 45})
  @Field()
  unit: string;

  @Column('varchar', { length: 50})
  @Field()
  geographyCode: string;

  @OneToMany(() => Impact, impact => impact.entry)
  impacts: Impact[];
}
