const Users = require("../models/users.js");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = process.env;

exports.getUsers = (req, res) => {
  const { user } = req;
  if (user) {
    Users.find({}, (err, users) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.render("users/users.html", { users, username: user.login });
    });
  } else {
    return res.redirect("/");
  }
};

exports.getUser = (req, res) => {
  const { user } = req;
  if (user) {
    const { api } = req.params;
    Users.find({ api }, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.json({ payload: user });
    });
  } else {
    return res.redirect("/");
  }
};

exports.createUser = async (req, res) => {
  const { body } = req;
  console.log("body", body);
  const { login, pass } = body;
  if (login && pass) {
    try {
      let user = await Users.findOne({
        login,
      })
        .lean()
        .exec();
      if (user) {
        return res.sendStatus(400);
      }
      let count = await Users.estimatedDocumentCount();
      bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) return res.sendStatus(500);
        user = new Users({
          api: sha1(count),
          login,
          pass: hash,
        });
        user.save((err) => {
          if (err) console.log(err);
          console.log("user", user);
          return res.redirect("/");
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  } else {
    return res.sendStatus(400);
  }
};

exports.changeUser = (req, res) => {
  const { body } = req;
  const { api } = req.params;
  const { login, pass } = body;
  if (login && pass) {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
      if (err) return res.sendStatus(500);
      Users.updateOne({ api }, { login, pass:hash }, (err, result) => {
        if (err) return res.sendStatus(500);
        return res.json({ payload: result });
      });
    });
  } else {
    return res.sendStatus(400);
  }
};

exports.deleteUser = (req, res) => {
  const { api } = req.params;
  Users.deleteOne({ api }, (err, deleteResult) => {
    if (err) return res.sendStatus(400);
    return res.json({ payload: deleteResult.n });
  });
};

exports.registration = (req, res) => {
  if (req.cookies["user"]) {
    return res.redirect("/short");
  }
  return res.render("users/registration.html");
};
exports.login = (req, res) => {
  const { login, password, remember } = req.body;
  Users.findOne({ login }, (err, user) => {
    if (err) return res.sendStatus(500);
    if (user) {
      console.log("user", user);
      bcrypt.compare(password, user.pass, (err, result) => {
        if (err) return res.sendStatus(500);
        if (result) {
          let expires = remember ? new Date(Date.now() + 2.592e8) : 0;
          console.log("expires", expires);
          let token = jwt.sign({ user: user }, SECRET);
          return res
            .status(200)
            .cookie("user", token, {
              samesite: "strict",
              httpOnly: true,
              expires,
            })
            .redirect("/short");
        } else {
          return res.status(400).send("Invalid credentials");
        }
      });
    } else {
      return res.status(404).send("User not found");
    }
  });
};
exports.logout = (req, res) => {
  return res.clearCookie("user").redirect("/");
};
