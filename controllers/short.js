const Shorter = require("../services/shorter");
const Link = require("../models/short");
const User = require("../models/users");
const Settings = require("../models/settings");
const { createPagination } = require("../services/pagination");
const LINKS_PER_PAGE = 10;
const SPREAD_SYMBOL = "...";

exports.getShortLink = async (req, res) => {
  let { user, query } = req;
  if (user) {
    let { api } = user;
    let count = await Link.countDocuments({ user_api: api });
    let maxPage = Math.ceil(count / LINKS_PER_PAGE);
    let page =
      query && query.page && typeof +query.page === "number"
        ? maxPage >= +query.page
          ? +query.page
          : maxPage
        : 1;
    let list = createPagination(page, maxPage, SPREAD_SYMBOL, 2);
    Link.find({ user_api: api }, async (err, links) => {
      if (err) {
        console.log(err);
        return res.render("error.html", { error: "Что-то пошло не так", user });;
      }
      let settingsArr = await Settings.find({ user_api: api });
      let settings = [];
      settingsArr.forEach((el) => {
        settings.push(el["service"]);
      });
      console.log("settings", settings);
      return res.render("short.html", {
        links,
        user,
        settings,
        currentPage: +page,
        maxPage,
        list,
        spread: SPREAD_SYMBOL,
      });
    })
      .sort({ created_at: 1 })
      .skip((page - 1) * LINKS_PER_PAGE)
      .limit(LINKS_PER_PAGE);
  } else {
    return res.redirect("/");
  }
};

exports.createShortLink = async (req, res) => {
  const { shortList, longUrl } = req.body;
  const api = req.user ? req.user.api : null;
  let userExists = await User.exists({ api });
  let docs = await Settings.find({ user_api: api }).exec();
  let settings = {};
  docs.forEach((el) => {
    settings[el.service] = el.params;
  });
  console.log(
    "url",
    longUrl,
    "shortList",
    shortList,
    "api",
    api,
    "userExists",
    userExists
  );
  if (userExists && shortList && settings) {
    let shortUrl = longUrl;
    try {
      for (let i = 0; i < shortList.length; i++) {
        console.log(i);
        if (settings[shortList[i]]) {
          shortUrl = await Shorter[shortList[i]](
            shortUrl,
            ...settings[shortList[i]]
          );
        } else {
          return res.status(400).send("No settings for " + shortList[i]);
        }
      }
    } catch (err) {
      console.log(err);
      shortUrl = "";
    }

    if (shortUrl) {
      let link = new Link({
        user_api: api,
        long_url: longUrl,
        short_url: shortUrl,
        created_at: new Date(),
      });
      link.save((err) => {
        if (err) return res.sendStatus(500);
        console.log("link", link);
        return res.json({ payload: link });
      });
    } else {
      res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
};

exports.deleteShortLink = (req, res) => {
  const { user } = req;
  const { id } = req.params;
  console.log("deleteShortLink: ", id);
  if ((id, user)) {
    Link.findByIdAndDelete(id, (err, deleteResult) => {
      if (err) return res.sendStatus(400);
      return res.json({ payload: deleteResult });
    });
  } else {
    return res.sendStatus(400);
  }
};
