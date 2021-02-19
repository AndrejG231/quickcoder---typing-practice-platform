import { UserInfo } from "../graphql/AuthMutationsT";
import { AuthReducerState } from "../../types/redux/AuthT";
import { globalMessage } from "../../types/redux/GlobalMessageT";
import { AnimationStateTypes } from "../../types/redux/AnimationT";
import { PracticeObjectT } from "../../types/redux/PracticeT";

export type ReduxState = {
  UserInfo: UserInfo;
  isAuth: AuthReducerState;
  globalMessage: globalMessage;
  Animations: AnimationStateTypes;
  Practice: PracticeObjectT;
  PracticeOffset: number;
};
