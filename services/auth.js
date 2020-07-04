const User = require("../models/users");

exports.checkAuth = function checkAuth (req,res,next) {
    let token = req.cookies.user;
    console.log("checkAuth:user",token);
    User.findOne({api:token}, (err,user)=>{
        if (err) return res.sendStatus(500);
        req.user = user;
        next();
    });
  }