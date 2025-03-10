const express = require("express");
const AutRoute = require("./routes/useRoute");
const proRoute = require("./routes/proRoute")
const { specs, swaggerUi } = require("./swager");
const { connectDb } = require("./config/db");
const path = require("path");

const app = express();
app.use(express.json());
app.use("/auth", AutRoute);
app.use("/auth", proRoute, express.static(path.resolve(__dirname, "uploads")))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
connectDb();

app.listen(3001, () => {
    console.log("server created...");
});
