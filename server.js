const express = require("express");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: "./config/.env" });
const app = express();

require("./config/db");

//MIDDLEWARES
app.use(express.json());

//routes
app.use("/api/user", userRoutes);

//server
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
