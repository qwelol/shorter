const Users = require("../models/users.js");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = process.env;
const { ROLES } = require("../services/roles");

exports.getUsers = (req, res, next) => {
  const { user } = req;
  if (user) {
    Users.find({}, (err, users) => {
      if (err) return next(err);
      return res.render("users/users.html", { users, user });
    });
  } else {
    return res.redirect("/");
  }
};

exports.getUser = (req, res, next) => {
  const { user } = req;
  if (user) {
    const { api } = req.params;
    Users.findOne({ api }, (err, account) => {
      if (err) return next(err);
      if (account) {
        return res.render("users/change.html", { user, account, ROLES });
      } else {
        return next(new Error("User not found"));
      }
    });
  } else {
    return res.redirect("/");
  }
};

exports.createUser = async (req, res, next) => {
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
        return res.render("users/registration.html", {
          err: "Такой пользователь уже существует",
        });
      }
      let count = await Users.estimatedDocumentCount();
      bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) return next(err);
        user = new Users({
          api: sha1(count),
          login,
          pass: hash,
          role: ROLES.Customer,
        });
        user.save((err) => {
          if (err) return next(err);
          console.log("user", user);
          return res.redirect("/");
        });
      });
    } catch (err) {
      return next(err);
    }
  } else {
    res.render("users/registration.html", {
      err: "Введите логин и пароль",
      login,
    });
  }
};

exports.changeUser = (req, res, next) => {
  const { body } = req;
  const { api } = req.params;
  const { role, pass } = body;
  if (role && pass) {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
      if (err) return next(err);
      Users.updateOne({ api }, { pass: hash, role }, (err, result) => {
        if (err) return next(err);
        return res.json({ payload: result });
      });
    });
  } else if (role) {
    Users.updateOne({ api }, { role }, (err, result) => {
      if (err) return next(err);
      return res.json({ payload: result });
    });
  } else {
    return res.sendStatus(400);
  }
};

exports.deleteUser = (req, res, next) => {
  const { api } = req.params;
  Users.deleteOne({ api }, (err, deleteResult) => {
    if (err) return next(err);
    return res.json({ payload: deleteResult.n });
  });
};

exports.registration = (req, res) => {
  if (req.cookies["user"]) {
    return res.redirect("/short");
  }
  return res.render("users/registration.html");
};

exports.login = (req, res, next) => {
  const { login, password, remember } = req.body;
  if (login && password) {
    Users.findOne({ login }, (err, user) => {
      if (err) return next(err);
      if (user) {
        console.log("user", user);
        bcrypt.compare(password, user.pass, (err, result) => {
          if (err) return next(err);
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
            return res.render("users/login.html", {
              err: "Неверный логин или пароль",
              login,
            });
          }
        });
      } else {
        return res.render("users/login.html", {
          err: "Неверный логин или пароль",
          login,
        });
      }
    });
  } else {
    return res.render("users/login.html", {
      err: "Введите логин и пароль",
      login,
    });
  }
};
exports.logout = (req, res) => {
  return res.clearCookie("user").redirect("/");
};
