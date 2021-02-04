const testStart = (name: string) => {
  console.log("\n#######  ", name, "  #######\n");
};

const testEnd = (name: string) => {
  console.log("\n####  end of", name, "  ####\n");
};

const runTest = async (name: string, callback: any) => {
  testStart(name);

  const startTime = new Date().getTime()
  const result = await callback();
  const endTime = new Date().getTime()

  console.log('Time taken: ', endTime - startTime, 'ms\n')
  console.log('## Result ##\n')
  console.log(result);
  
  testEnd(name);
};

export default runTest;
