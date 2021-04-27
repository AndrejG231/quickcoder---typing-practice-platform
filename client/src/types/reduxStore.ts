import { animations } from "./types_redux/animationsT";
import { authentication } from "./types_redux/authenticationT";
import { globalMessage } from "./types_redux/globalMessageT";
import { practiceSelection } from "./types_redux/practiceSelectionT";
import { practice } from "./types_redux/practiceT";
import { userPracticeStats } from "./types_redux/userPracticeStatsT";

type reduxStore = {
  animations: animations;
  authentication: authentication;
  globalMessage: globalMessage;
  practiceSelection: practiceSelection;
  practice: practice;
  userPracticeStats: userPracticeStats;
};

export default reduxStore;
