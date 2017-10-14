const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

const dist = path.join(process.cwd(), "public")
const src = path.join(process.cwd(), "src")

//module.exports = { dist, src }
module.exports = {
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
    new CleanWebpackPlugin(dist),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "node"
}
