const { db } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = db.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;
