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
    timestamps: false, // Exclude createdAt and updatedAt fields
  }
);

module.exports = department;