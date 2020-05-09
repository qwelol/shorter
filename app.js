const express = require("express");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const routes = require("./routes");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.use("/", routes);

app.get("/", (req, res) => {
  return res.render("_layout.html");
});
mongoose.connect(
  "mongodb://localhost/shorterDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);
    app.listen(port, () => {
      console.log("App starts at", port);
    });
  }
);
