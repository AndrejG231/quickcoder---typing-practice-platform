import { ObjectType, Field } from "type-graphql";
import Practices from "../entities/Practices";
import ActionResponse from "./ActionResponse";

@ObjectType()
class PracticeInfoResponse {
  @Field()
  result: ActionResponse;

  @Field({nullable: true})
  data?: Practices;
}

export default PracticeInfoResponse;
