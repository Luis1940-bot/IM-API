const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "dishes",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
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
      estimatedTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
