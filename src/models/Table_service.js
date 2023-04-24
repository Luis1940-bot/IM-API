const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "table_services",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      validity: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};