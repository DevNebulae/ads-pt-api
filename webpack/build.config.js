const webpack = require("webpack")
const path = require("path")

const nodeExternals = require("webpack-node-externals")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const StartServerPlugin = require("start-server-webpack-plugin")

const dist = path.join(process.cwd(), "public")
const src = path.join(process.cwd(), "src")

module.exports = env => ({
  entry: [path.join(src, "index.js")],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)?$/,
        use: "raw-loader"
      },
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
        test: /\.y(a?)ml$/,
        use: ["json-loader", "yaml-loader"]
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "node"
})
