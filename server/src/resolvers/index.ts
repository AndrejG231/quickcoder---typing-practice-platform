import auth from "./auth";
import practice from "./practice";
import stats from "./stats";

const resolvers: [Function, ...Function[]] = [auth, practice, stats];

export default resolvers;
