const express = require("express");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { cookieExtractor, verify } = require("./services/auth");
const passport = require("passport");
const { Strategy } = require("passport-jwt");
require("dotenv").config();

const { PORT, PUBLIC_PATH, CONNECTION_STRING, SECRET } = process.env;

const app = express();

const routes = require("./routes");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

let opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: SECRET,
};

passport.use(new Strategy(opts, verify));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/static", express.static(PUBLIC_PATH));

app.use("/", routes);

// error handling
app.use((err, req, res, next) => {
  let { user } = req;
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  return res.render("error.html", { error: "Что-то пошло не так", user });
});

app.get("/", (req, res) => {
  if (req.cookies["user"]) {
    return res.redirect("/short");
  }
  return res.render("users/login.html");
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
