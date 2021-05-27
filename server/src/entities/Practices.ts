import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
@Entity("practices")
class Practices extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column()
  practice_index!: number;

  @Field()
  @Column()
  string!: string;

  @Field()
  @Column({ default: 0 })
  index!: number;

  @Field()
  @Column({ default: "{}" })
  errors!: string;

  @Field()
  @Column({ default: 0 })
  time_spent: number; //ms

  @Field()
  @Column({ default: false })
  is_finished!: boolean;

  @Field(() => Int)
  @Column()
  user_id!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  score: number;

  @Field(() => Int)
  @Column({ default: 0 })
  cpm: number;

  @Field(() => Float)
  @Column({ type: "float", default: 0 })
  errors_rate: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}

export default Practices;
