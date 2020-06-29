const User = require("../models/users");

exports.checkAuth = function checkAuth (req,res,next) {
    let user = req.cookies.user;
    console.log("checkAuth:user",user);
    User.exists({api:user}, (err,userExists)=>{
        if (err) return res.sendStatus(500);
        req.user = userExists? user : null;
        next();
    });
  }