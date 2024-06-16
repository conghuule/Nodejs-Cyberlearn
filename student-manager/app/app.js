const express = require("express");
const router = require("./routers/index");
const app = express();
const port = 7000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});

const { sequelize } = require("./models");
sequelize.sync({ alter: true });
