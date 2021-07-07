const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = (enviroment) => {
  const { mode } = enviroment;
  const modeConfig = require(`./webpack.${mode}.js`);
  return merge(commonConfig, modeConfig);
};
