import auth from "./auth";
import practice from "./practice";
import stats from "./stats";
import profile from "./profile";

const resolvers: [Function, ...Function[]] = [auth, practice, stats, profile];

export default resolvers;
