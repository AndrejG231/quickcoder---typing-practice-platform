import { userInfo } from "../../types";
import { AuthReducerState } from "../../types/redux/AuthT";
import { globalMessage } from "../../types/redux/GlobalMessageT";
import { PracticeObjectT } from "../../types/practice/PracticeT";
import { practiceMenuStateObjectT } from "./PracticeMenuT";
import { userStatObjectT } from "./PracticeUserStats";
import { practiceSelectionStateT } from "./PracticeSelectionT";
import { animationStateT } from "./AnimeT";

export type ReduxState = {
  UserInfo: userInfo | undefined;
  checkAuth: AuthReducerState;
  globalMessage: globalMessage;
  Practice: PracticeObjectT;
  PracticeOffset: number;
  PracticeMenu: practiceMenuStateObjectT;
  PracticeUserStats: userStatObjectT;
  PracticeSelection: practiceSelectionStateT;
  Animation: animationStateT;
};
