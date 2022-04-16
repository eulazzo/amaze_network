const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
const cors = require("cors");
require("./config/db");

//MIDDLEWARES
app.use(cors());  
app.use(express.json());
app.use(cookieParser());

// JWT
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (_req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

//server
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
