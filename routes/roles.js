const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class roles extends Model {}

roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "department",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "roles",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = roles;