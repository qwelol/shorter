// const User = require("../models/users");
const passport = require("passport");

exports.checkAuth = passport.authenticate("jwt", {
  session: false,
  // successRedirect: "/short",
  failureRedirect: "/",
});

exports.cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["user"];
  }
  return token;
};
exports.verify = (jwt_payload, done) => {
  // console.log("jwt_payload", jwt_payload);
  if (jwt_payload.user) {
    return done(null, jwt_payload.user);
  } else {
    return done(null, false);
  }
}
// exports.checkAuth = function checkAuth(req, res, next) {
//   passport.authenticate("jwt", {
//     session: false,
//     successRedirect: "/short",
//     failureRedirect: "/",
//   })(req, res, next);
//   next();
// let token = req.cookies.user;
// console.log("checkAuth:user",token);
// User.findOne({api:token}, (err,user)=>{
//     if (err) return res.sendStatus(500);
//     req.user = user;
//     next();
// });
// };
