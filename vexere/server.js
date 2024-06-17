const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const PORT = 3000;

const app = express();

app.use(express.json());

const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));

app.use("/api/v1", rootRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
