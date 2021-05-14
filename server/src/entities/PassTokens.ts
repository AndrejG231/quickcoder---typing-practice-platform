import { Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("passtokens")
class PassTokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Generated("uuid")
  token!: string;

  @Column({ default: true })
  valid!: boolean;

  @Column()
  user_id!: number;

  @Column()
  expires_at!: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}

export default PassTokens;
