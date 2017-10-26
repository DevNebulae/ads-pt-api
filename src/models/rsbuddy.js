export default (sequelize, DataTypes) => {
  const RSBuddy = sequelize.define("rsbuddy", {
    id: {
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.UUID
    },
    ts: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    buyingPrice: {
      field: "buying_price",
      type: DataTypes.BIGINT
    },
    buyingCompleted: {
      field: "buying_completed",
      type: DataTypes.BIGINT
    },
    sellingPrice: {
      field: "selling_pice",
      type: DataTypes.BIGINT
    },
    sellingCompleted: {
      field: "selling_completed",
      type: DataTypes.BIGINT
    },
    overallPrice: {
      field: "overall_price",
      type: DataTypes.BIGINT
    },
    overallCompleted: {
      field: "overall_completed",
      type: DataTypes.BIGINT
    }
  })

  return RSBuddy
}
