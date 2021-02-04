import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
class Users extends BaseEntity {
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

  @Field()
  @Column({ default: "en" })
  language!: string;

  @Field()
  @Column({ default: "US" })
  keyboard_layout!: string;

  @Field()
  @Column({ default: "dark" })
  color_scheme!: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at = Date;
}

export default Users;
