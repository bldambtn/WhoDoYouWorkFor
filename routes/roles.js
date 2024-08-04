const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const department = require ('./department');

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
    timestamps: false, // Exclude createdAt and updatedAt fields
  }
);

roles.belongsTo(department, { foreignKey: 'department_id'});

module.exports = roles;