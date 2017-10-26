export default (sequelize, DataTypes) => {
  const Update = sequelize.define("update", {
    id: {
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.UUID
    },
    date: {
      type: DataTypes.DATE
    },
    text: {
      type: DataTypes.TEXT
    }
  })

  return Update
}
