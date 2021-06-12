import { action } from "../../types/types_redux/profileT";

const togglePracticeHistoryRefresh = (refresh: boolean): action => ({
  type: "profile/toggleHistoryRefresh",
  refresh,
});

export default togglePracticeHistoryRefresh;
