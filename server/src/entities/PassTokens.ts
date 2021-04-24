import { Field, Float } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
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

  @Column()
  client_info!: string;

  @Field(() => Float)
  @Column()
  created_at!: Date;
}

export default PassTokens;
