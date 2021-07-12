const routes = {
  default: "/",
  home: "/home/",
  profile: "/profile/",
  login: "/home/login/",
  register: "/home/signup",
  recoverPass: "/home/forgot_password/",
  practiceMenu: "/practice_menu/",
  runningPractice: (id: string | number) => `/practice/in_progress/id=${id}/`,
  finishedPractice: (id: string | number) => `/practice/finished/id=${id}/`,
  leaderBoard: (category: string, index: number | string) =>
    `/leaderboard/c=${category}/i=${index}/`,
  recoverPassWithToken: (token: string) =>
    `/home/change_password_w_token/${token}/`,
  profileUnfinished: "/profile/unfinished/",
  profileHistory: "/profile/history/",
  settings: "/settings/",
  practicePreferences: "/settings/practice_preferences/",
};

export default routes;
