require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const conexaoBancoDeDados = require("./config/database");
const presencasRouter = require("./routes/presencasRouter");

const app = express();


conexaoBancoDeDados();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/presencas", presencasRouter);

module.exports = app;
