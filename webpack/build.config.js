const BASE_CONFIG = require("./shared.config")
const merge = require("webpack-merge")

module.exports = env => merge.smart(BASE_CONFIG, {})
