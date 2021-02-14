interface clientParam {
  (): string;
}

const getClientParam: clientParam = () => {
  const info = window.navigator;

  const infoString = `a:${info.hardwareConcurrency};\
  b:${info.appVersion};\
  c:${info.appCodeName};\
  d:${info.appName}`;

  return infoString;
};

export default getClientParam;
