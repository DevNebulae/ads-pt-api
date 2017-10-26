import Sequelize from "sequelize"
import { CONFIG } from "./server"

const sequelize = new Sequelize(
  CONFIG.postgres.database,
  CONFIG.postgres.role,
  CONFIG.postgres.password,
  {
    host: CONFIG.postgres.host,
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
    define: {
      underscored: true,
      underscoredAll: true
    }
  }
)

const models = {
  item: sequelize.import("item", require("./models/item")),
  rsbuddy: sequelize.import("rsbuddy", require("./models/rsbuddy")),
  update: sequelize.import("update", require("./models/update"))
}

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
