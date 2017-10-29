import mongoose from "mongoose"
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

const mongo = mongoose.connect(
  `mongodb://${CONFIG.mongodb.username}:${CONFIG.mongodb.password}@${CONFIG
    .mongodb.host}:${CONFIG.mongodb.port}`
)

const models = {
  item: sequelize.import("item", require("./sequelize/models/item")),
  rsbuddy: sequelize.import("rsbuddy", require("./sequelize/models/rsbuddy")),
  update: require("./mongoose/models/update")
}

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models)
  }
})

export { mongo, sequelize, Sequelize }
export default models
