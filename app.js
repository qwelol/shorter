const express = require("express");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const checkAuth = require("./services/auth").checkAuth;
require('dotenv').config();

const { PORT, PUBLIC_PATH, CONNECTION_STRING } = process.env;

const app = express();

const routes = require("./routes");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/static", express.static(PUBLIC_PATH));

app.use("/", routes);



app.get("/", checkAuth, (req, res) => {
  if (req.user){
    return res.redirect("/short");
  }
  return res.render("login.html");
});
mongoose.connect(
  CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);
    app.listen(PORT, () => {
      console.log("App starts at", PORT);
    });
  }
);
