import { UserInfo } from "../graphql/AuthMutationsT";
import { AuthReducerState } from "../../types/redux/AuthT";
import { globalMessage } from "../../types/redux/GlobalMessageT";
import { AnimationStateTypes } from "../../types/redux/AnimationT";
import { PracticeObjectT } from "../../types/practice/PracticeT";
import { practiceMenuStateObjectT } from "./practiceMenuT";

export type ReduxState = {
  UserInfo: UserInfo;
  AuthCount: AuthReducerState;
  globalMessage: globalMessage;
  Animations: AnimationStateTypes;
  Practice: PracticeObjectT;
  PracticeOffset: number;
  PracticeMenu: practiceMenuStateObjectT;
};
