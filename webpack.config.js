const env = process.env.NODE_ENV

switch (env) {
  case "production":
    module.exports = require("./webpack/build.config.js")(env)
    break
  case "development":
    module.exports = require("./webpack/dev.config.js")(env)
    break
}
