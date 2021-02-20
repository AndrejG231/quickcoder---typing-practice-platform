import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Users from "./Users";

export type Errors = {
  [index: number]: string;
};

@ObjectType()
@Entity("practices")
class Practices extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ default: "" })
  string!: string;

  @Field()
  @Column({ default: 0 })
  errorsCount!: number;

  @Field()
  @Column({ default: {} })
  errors!: Errors;

  @Field()
  @Column({ default: 0 })
  timeSpent: number; //ms

  @Field()
  @Column({ default: false })
  isFinished!: boolean;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @ManyToOne(() => Users, (user) => user.practices)
  user: Users;

  @Field()
  @CreateDateColumn()
  created_at = Date;
}

export default Practices;
