import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
@Entity("practices")
class Practices extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  practice_name!: string;

  @Field()
  @Column()
  string!: string;

  @Field()
  @Column({ default: 0 })
  index!: number;

  @Field()
  @Column({ default: 0 })
  errors_count!: number;

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

  @Field(() => Float)
  @Column()
  created_at!: Date;
}

export default Practices;
