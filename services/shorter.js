const fetch = require("node-fetch");
const FormData = require("form-data");
const sha1 = require("sha1");

let counter = 0;

async function catcutShort(url, id, secretKey, adv = "0") {
  const BASE_SHORT_URL = "https://catcut.net/s/";
  let authString = url + id + adv + secretKey;
  let hash = sha1(authString);
  let formData = new FormData();
  formData.append("longurl", url);
  formData.append("id", id);
  formData.append("advsurfing", adv);
  formData.append("hash", hash);
  let shortLink = await fetch("https://catcut.net/api/create.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        throw new Error("catcutShort: Failed to request");
      }
    })
    .then((data) => {
      if (data) {
        return BASE_SHORT_URL + data;
      } else {
        throw new Error("catcutShort: No data");
      }
    })
    .catch((err) => {
      if (counter) {
        counter = 0;
        console.log(err.message);
      } else {
        counter++;
        catcutShort(url, id, secretKey);
      }
    });
  return shortLink;
}

async function flShort(url, api) {
  let shortUrl = await fetch("http://fc.lc/api?api=" + api + "&url=" + url, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("flShort: Failed to request");
      }
    })
    .then((data) => {
      if (data) {
        return data.shortenedUrl;
      } else {
        throw new Error("flShort: No data");
      }
    })
    .catch((err) => {
      if (counter) {
        counter = 0;
        console.log(err.message);
      } else {
        counter++;
        flShort(url, api);
      }
    });
  return shortUrl;
}

async function shorteSt(url, api) {
  let shortUrl = await fetch("https://api.shorte.st/v1/data/url", {
    method: "PUT",
    headers: {
      "public-api-token": api,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "urlToShorten=" + url,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("shorteSt: Failed to request");
      }
    })
    .then((data) => {
      if (data) {
        return data.shortenedUrl;
      } else {
        throw new Error("shorteSt: No data");
      }
    })
    .catch((err) => {
      if (counter) {
        counter = 0;
        console.log(err.message);
      } else {
        counter++;
        shorteSt(url, api);
      }
    });
  return shortUrl;
}

async function exeShort(url, api) {
  let shortUrl = await fetch("https://exe.io/api?api=" + api + "&url=" + url, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("exeShort: Failed to request");
      }
    })
    .then((data) => {
      if (data) {
        return data.shortenedUrl;
      } else {
        throw new Error("exeShort: No data");
      }
    })
    .catch((err) => {
      if (counter) {
        counter = 0;
        console.log(err.message);
      } else {
        counter++;
        exeShort(url, api);
      }
    });
  return shortUrl;
}
async function profitLinkShort(url, api) {
  let pUrl = url.match(/https:\/\/|http:\/\//) ? url : "http://" + url;
  let shortUrl = await fetch(
    "http://profit-link.ru/api.php?key=" + api + "&url=" + pUrl + "&ads=Y",
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("profitLinkShort: Failed to request");
      }
    })
    .then((data) => {
      if (data) {
        return data.success;
      } else {
        throw new Error("profitLinkShort: No data");
      }
    })
    .catch((err) => {
      if (counter) {
        counter = 0;
        console.log(err.message);
      } else {
        counter++;
        profitLinkShort(url, api);
      }
    });
  return shortUrl;
}
async function q32Short(url, api) {
  let pUrl = url.match(/https:\/\/|http:\/\//) ? url : "http://" + url;
  let shortUrl = await fetch(
    "https://q32.link/api.php?key=" + api + "&url=" + pUrl,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        throw new Error("q32Short: Failed to request");
      }
    })
    .then((data) => {
      if (data) {
        return data;
      } else {
        throw new Error("q32Short: No data");
      }
    })
    .catch((err) => {
      if (counter) {
        counter = 0;
        console.log(err.message);
      } else {
        counter++;
        q32Short(url, api);
      }
    });
  return shortUrl;
}

let Shorter = {
  catcutShort,
  flShort,
  shorteSt,
  exeShort,
  profitLinkShort,
  q32Short,
  test: () => {
    console.log("Its ok!");
  },
};
module.exports = Shorter;
