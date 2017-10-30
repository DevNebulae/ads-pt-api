const CleanWebpackPlugin = require("clean-webpack-plugin")
const fs = require("fs")
const path = require("path")
const webpack = require("webpack")

const dist = path.join(process.cwd(), "public")
const src = path.join(process.cwd(), "src")

var nodeModules = {}
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod
  })

//module.exports = { dist, src }
module.exports = {
  entry: [path.join(src, "index.js")],
  externals: nodeModules,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(graphql|gql)?$/,
        use: "graphql-tag/loader"
      },
      {
        exclude: /node_modules/,
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader"
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
    new CleanWebpackPlugin(dist, {
      root: process.cwd()
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "node"
}
