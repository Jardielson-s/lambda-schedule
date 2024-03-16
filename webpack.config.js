/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
// const nodeExternals = require("webpack-node-externals");

const isProduction =
  typeof process.env.NODE_ENV !== "undefined" &&
  process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";
const devtool = isProduction ? false : "inline-source-map";

// const appInput = process.env.APP_INPUT;

module.exports = {
  entry: [`./src/infra/aws/lambda/handler.ts`],
  optimization: {
    minimize: false,
  },
  target: "node",
  mode,
  devtool,
  // externals: [
  //   nodeExternals({
  //     allowlist: ["webpack/hot/poll?100"],
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      [`@src`]: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\.\/native/,
      contextRegExp: /\/pg\//,
    }),
  ],
  output: {
    path: path.join(__dirname, "dist", "src"),
    filename: "handler.js",
  },
};
