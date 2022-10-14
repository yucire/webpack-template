const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssPlugin({
      filename: "css/[name].[contenthash:6].css",
    }),
  ],
};
