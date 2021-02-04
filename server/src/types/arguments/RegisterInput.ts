import { Field, InputType } from "type-graphql"

@InputType()
class RegisterInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

export default RegisterInput