import {
  BaseEntity,
  Column,
  CreateDateColumn,
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

  @Column()
  created_at!: Date;
}

export default PassTokens;
