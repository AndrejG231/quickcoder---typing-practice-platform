import { ObjectType, Field } from "type-graphql";
import Practices from "../entities/Practices";
import ActionResponse from "./actionResponse";

@ObjectType()
class PracticeInfoResponse {
  @Field()
  result: ActionResponse;

  @Field({nullable: true})
  practice?: Practices;
}

export default PracticeInfoResponse;
