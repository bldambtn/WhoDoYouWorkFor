const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class employee extends Model {}

employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "employee",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = employee;