const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const adminRouter = require("./routes/adminRouter.js");
const userRouter = require("./routes/userRouter.js");

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port: ` + PORT);
});
