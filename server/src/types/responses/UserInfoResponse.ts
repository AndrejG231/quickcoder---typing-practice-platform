import { ObjectType, Field}  from "type-graphql";
import Users from "../entities/Users";
import ActionResponse from "./ActionResponse";

@ObjectType()
class UserInfoResponse{
  @Field(() => Users, {nullable: true})
  user?: Users;

  @Field(() => ActionResponse, {nullable: true})
  error?: ActionResponse;
}

export default UserInfoResponse;