const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: "./dist/client",
    },
    host: "localhost",
    port: 3000,
    hot: true,
  },
});
