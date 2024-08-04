const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class department extends Model {}

department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      //allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "department",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = department;