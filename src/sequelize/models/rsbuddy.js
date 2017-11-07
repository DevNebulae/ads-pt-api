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
      buyingCompleted: {
        field: "buying_completed",
        type: DataTypes.BIGINT
      },
      sellingPrice: {
        field: "selling_price",
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
    },
    {
      freezeTableName: true,
      indexes: [
        {
          fields: ["item_id"]
        }
      ]
    }
  )

  return rsbuddy
}
