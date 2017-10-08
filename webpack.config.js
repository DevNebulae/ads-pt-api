const webpack = require("webpack")
const path = require("path")

const nodeExternals = require("webpack-node-externals")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const StartServerPlugin = require("start-server-webpack-plugin")

const dist = path.join(__dirname, "public")
const src = path.join(__dirname, "src")

module.exports = {
  entry: ["webpack/hot/poll?1000", path.join(src, "index.js")],
  externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [["env", { modules: false }], "stage-0"],
              plugins: ["transform-regenerator", "transform-runtime"]
            }
          }
        ]
      },
      {
        test: /\.(graphql|gql)?$/,
        use: "raw-loader"
      }
    ]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  output: { path: dist, filename: "server.js" },
  plugins: [
    new CleanWebpackPlugin(dist),
    new StartServerPlugin("server.js"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "node",
  watch: true
}
