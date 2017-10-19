const BASE_CONFIG = require("./shared.config")
const merge = require("webpack-merge")
const webpack = require("webpack")

module.exports = env =>
  merge.smart(BASE_CONFIG, {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: env
        }
      })
    ]
  })
