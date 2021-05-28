import { animations } from "./types_redux/animationsT";
import { authentication } from "./types_redux/authenticationT";
import { globalMessage } from "./types_redux/globalMessageT";
import { practiceSelection } from "./types_redux/practiceSelectionT";
import { practice } from "./types_redux/practiceT";
import { practiceMenu } from "./types_redux/practiceMenuT";
import { userPracticeStats } from "./types_redux/userPracticeStatsT";

type reduxStore = {
  animations: animations;
  authentication: authentication;
  globalMessage: globalMessage;
  practiceSelection: practiceSelection;
  practice: practice;
  practiceMenu: practiceMenu;
  userPracticeStats: userPracticeStats;
};

export default reduxStore;
