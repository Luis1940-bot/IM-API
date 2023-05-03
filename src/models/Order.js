const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      date: {
        type: DataTypes.DATE,
      },
      hour: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM(
          "orderPlaced",
          "processingOrder",
          "orderInPreparation",
          "orderReady",
          "delivered",
          "canceled"
        ),
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      validity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
