const path = require("path");

module.exports = {
  entry: "./src/client/client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../../dist/client"),
  },
};
