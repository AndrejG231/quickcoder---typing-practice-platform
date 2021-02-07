import devOptions from "./devOptions";

const dlog = (...args: any) => {

  if (devOptions.devLogging) {
    console.log("\n", ...args, "\n");
  }

  return true;
};

export default dlog;
