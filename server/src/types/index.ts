export { default as ActionResponse } from "./actionResponse";
// Success-Info-Message response type

export { default as AverageUserStats } from "./averageUserStats";
// user average stats type for profile overview query

export { default as GraphqlContext } from "./graphqlContext";

export { default as LoginInput } from "./loginInput";

export { default as MenuItem } from "./menuItem";
export { default as MenuResponse } from "./menuResponse";
// practice menu query object types

export { default as PracticeCategory } from "./practiceCategory";

export { default as PracticeInfoResponse } from "./practiceInfoResponse";
// for creating and loading practice => ActionResponse and Practices entity

export { default as PracticeLeaderboardResponse } from "./practiceLeaderboardItem";
// for practice information at practice leaderboard

export { default as PracticeStat } from "./practiceStat";
// for user practice stats displayed in menu screen

export { default as PracticeStatsResponse } from "./practiceStatsResponse";
// response for userPracticeStats => ActionResponse and PracticeStat

export { default as PracticeUpdateFields } from "./practiceUpdateFields";
// input fields for update practice mutation

export { default as ProfileOverviewResponse } from "./profileOverviewResponse";
// response for profile overview => ActionResponse, AverageUserStats, PracticeStats

export { default as ProfileHistoryResponse } from "./profileHistoryResponse";
// response for profile history => ActionResponse, Recent practices and total practices count

export type { default as RecentPracticeStats } from "./recentPracticeStats";
// getRecentStats utility output type

export { default as RegisterInput } from "./registerInput";
// input fields for user registration

export { default as UserInfoResponse } from "./userInfoResponse";
// response types with user information for client => ActionResponse and Users entity

export { default as UnfinishedPracticeInfo } from "./unfinishedPracticeInfo";
// practice object type for data of unfinished practice

export { default as UnfinishedPracticesResponse } from "./unfinishedPracticesResponse";
// response type for unfinished practices list query

export { default as TypingTestResult } from "./TypingTestResult";
// Typing test result object

export { default as FinishTypingTestResponse } from "./finishTypingTestResponse";
// Typing test mutation response => ActionResponse & TypingTestResult
