const { Sequelize } = require("sequelize");

const db = new Sequelize("n17", "root", "Asilbek_2007", {
    host: "localhost",
    dialect: "mysql",
});

async function connectDb() {
    try {
        await db.authenticate();
        console.log("Sequelize connected...");
        // await db.sync({ force: true });
        // console.log("Sequelize synced...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { db, connectDb };
