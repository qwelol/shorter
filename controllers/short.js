const Shorter = require("../services/shorter");
const Link = require("../models/short");
const User = require("../models/users");
const Settings = require("../models/settings");

exports.getShortLink = (req, res) => {
  let {user} = req;
  if (user) {
    Link.find({user_api:user}, (err, links) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.render("short.html", { links:links.reverse() });
    });
  } else {
    return res.redirect("/");
  }
};

exports.postShortLink = async (req, res) => {
  let longUrl = req.body.url;
  let { shortList, api } = req.body;
  let userExists = await User.exists({ api });
  let docs = await Settings.find({user_api:api}).exec();
  let settings = {};
  docs.forEach(el=>{
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
        if (settings[shortList[i]]){
          shortUrl = await Shorter[shortList[i]](
            shortUrl,
            ...settings[shortList[i]]
          );
        } else {
          return res.status(400).send('No settings for '+shortList[i]);
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
  const { id } = req.params;
  console.log(id);
  if (id) {
    Link.findByIdAndDelete(id, (err, deleteResult) => {
      if (err) return res.sendStatus(400);
      return res.json({ payload: deleteResult });
    });
  } else {
    return res.sendStatus(400);
  }
};
