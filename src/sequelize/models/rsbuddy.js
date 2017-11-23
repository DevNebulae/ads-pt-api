export default (sequelize, DataTypes) => {
  const rsbuddy = sequelize.define(
    "rsbuddy",
    {
      id: {
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        type: DataTypes.UUID
      },
      timestamp: {
        allowNull: false,
        field: "ts",
        type: DataTypes.DATE
      },
      buyingPrice: {
        field: "buying_price",
        type: DataTypes.BIGINT
      },
      buyingPriceDelta: {
        field: "buying_price_delta",
        type: DataTypes.DOUBLE
      },
      buyingCompleted: {
        field: "buying_completed",
        type: DataTypes.BIGINT
      },
      buyingCompletedDelta: {
        field: "buying_completed_delta",
        type: DataTypes.DOUBLE
      },
      sellingPrice: {
        field: "selling_price",
        type: DataTypes.BIGINT
      },
      sellingPriceDelta: {
        field: "selling_price_delta",
        type: DataTypes.DOUBLE
      },
      sellingCompleted: {
        field: "selling_completed",
        type: DataTypes.BIGINT
      },
      sellingCompletedDelta: {
        field: "selling_completed_delta",
        type: DataTypes.DOUBLE
      },
      overallPrice: {
        field: "overall_price",
        type: DataTypes.BIGINT
      },
      overallPriceDelta: {
        field: "overall_price_delta",
        type: DataTypes.DOUBLE
      },
      overallCompleted: {
        field: "overall_completed",
        type: DataTypes.BIGINT
      },
      overallCompletedDelta: {
        field: "overall_completed_delta",
        type: DataTypes.DOUBLE
      }
    },
    {
      freezeTableName: true,
      indexes: [
        {
          fields: ["item_id", "ts"],
          unique: true
        },
        {
          fields: ["ts"],
          method: "BTREE"
        }
      ]
    }
  )

  return rsbuddy
}
