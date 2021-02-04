import { InputType, Field } from "type-graphql";

@InputType()
class LoginInput {
  @Field()
  identification: string;

  @Field()
  password: string;
}

export default LoginInput;
