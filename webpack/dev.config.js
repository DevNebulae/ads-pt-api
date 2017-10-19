const BASE_CONFIG = require("./shared.config")
const merge = require("webpack-merge")
const nodeExternals = require("webpack-node-externals")
const StartServerPlugin = require("start-server-webpack-plugin")
const webpack = require("webpack")

module.exports = env =>
  merge.smart(BASE_CONFIG, {
    devtool: "#source-map",
    entry: ["webpack/hot/poll?1000"],
    externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
    plugins: [
      new StartServerPlugin("server.js"),
      new webpack.HotModuleReplacementPlugin()
    ],
    watch: true
  })
