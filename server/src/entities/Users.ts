import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
class Users extends BaseEntity {
  // Main
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // User preferences
  @Field()
  @Column({ default: "en" })
  language!: string;

  @Field()
  @Column({ default: "en-us" })
  keyboard_layout!: string;

  @Field({ nullable: true })
  @Column({ default: true })
  keyboard_indexes: boolean;

  @Field({ nullable: true })
  @Column({ default: true })
  keyboard_visuals: boolean;

  @Field({ nullable: true })
  @Column({ default: true })
  animations: boolean;

  // Authentication
  @Column({ default: 0 })
  token_version!: number;

  @Column()
  @Generated("uuid")
  secret: string;

  // Dates generation
  @Field(() => String)
  @CreateDateColumn()
  created_at!: number;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at = Date;
}

export default Users;
