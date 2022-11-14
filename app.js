const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("資料庫連線成功!!");
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const etflistRouter = require("./routes/etflist");
const etfcontentRouter = require("./routes/etfcontent");
const twsecodeRouter = require("./routes/TWSECode");
const diyRouter = require("./routes/DIYList");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/etflist", etflistRouter);
app.use("/twsecode", twsecodeRouter);
app.use("/etfcontent", etfcontentRouter);
app.use("/diy", diyRouter);


module.exports = app;
