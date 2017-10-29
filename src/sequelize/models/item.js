export default (sequelize, DataTypes) => {
  const item = sequelize.define("item", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    store: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  })

  item.associate = function(models) {
    item.hasMany(models.rsbuddy, {
      targetKey: "itemId",
      foreignKey: "item_id"
    })
  }

  return item
}
