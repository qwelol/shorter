const Settings = require("../models/settings");
const User = require("../models/users");

exports.getSettings = (req, res, next) => {
  Settings.find({}, (err, settings) => {
    if (err) {
      return next(err);
    }
    return res.json({ payload: settings });
  });
};

exports.getUserSettings = (req, res, next) => {
  const { user } = req;
  if (user) {
    const { api } = user;
    User.exists({ api }, (err, val) => {
      if (err) return next(err);
      if (val) {
        Settings.find({ user_api: api }, (err, settings) => {
          if (err) return next(err);
          let vSet = {};
          settings.forEach((el) => {
            vSet[el.service] = el.params;
          });
          console.log(vSet);
          return res.render("settings.html", { settings: vSet, user });
        });
      } else {
        return next(new Error("User not found"));
      }
    });
  } else {
    return res.redirect("/");
  }
};

exports.createSettings = async (req, res, next) => {
  const { body } = req;
  const user_api = req.user ? req.user.api : null;
  const { service, params } = body;
  console.log(user_api, service);
  console.log(
    "createSettings: " + "service",
    service,
    "params",
    params,
    "user_api",
    user_api
  );
  let userExists = await User.exists({ api: user_api });
  if (user_api && service && params && userExists) {
    try {
      Settings.exists({ user_api, service }, (err, val) => {
        if (err) return next(err);
        if (!val) {
          record = new Settings({
            user_api,
            service,
            params,
          });
          record.save((err) => {
            if (err) return next(err);
            console.log("record", record);
            return res.json({ payload: record });
          });
        } else {
          return res.sendStatus(400);
        }
      });
    } catch (err) {
      return next(err);
    }
  } else {
    return res.sendStatus(400);
  }
};

exports.changeSettings = (req, res, next) => {
  const api = req.user ? req.user.api : null;
  const { service } = req.params;
  console.log("changeSettings: ", api, service);
  const { params } = req.body;
  if (params) {
    Settings.exists({ user_api: api, service }, (err, val) => {
      if (err) return next(err);
      if (val) {
        Settings.updateOne(
          {
            user_api: api,
            service,
          },
          {
            params,
          },
          (err, result) => {
            if (err) return next(err);
            return res.json({ payload: result });
          }
        );
      } else {
        return res.sendStatus(404);
      }
    });
  } else {
    return res.sendStatus(400);
  }
};

exports.deleteSettings = (req, res, next) => {
  const api = req.user ? req.user.api : null;
  const { service } = req.params;
  console.log("deleteSettings: ", api, service);
  if ((api, service)) {
    Settings.exists({ user_api: api, service }, (err, val) => {
      if (err) return next(err);
      if (val) {
        Settings.deleteOne({ user_api: api, service }, (err, deleteResult) => {
          if (err) return next(err);
          return res.json({ payload: deleteResult.n });
        });
      } else {
        return res.sendStatus(404);
      }
    });
  } else {
    return res.sendStatus(400);
  }
};
