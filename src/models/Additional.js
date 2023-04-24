const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "additionals",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};