const User = require("../models/users.js");

exports.getUsers = (req,res)=>{
    let data = {
        users: User.getAll(),
    }
    return res.render('users.html', data);
}

exports.getUser = (req,res)=>{
    const { api } = req.params;
    return res.json({ payload: User.getUser(api) });
}

exports.createUser = (req,res)=>{
    const { body } = req;
    console.log("body",body);
    const { login, pass } = body;
    if (login && pass && !User.getAll().find((user) => user.login === login)){
        const user = new User(login,pass);
        console.log("user",user);
        user.save();
        res.json({payload:user});
    }
    else {
        res.sendStatus(400);
    }
}

exports.changeUser = (req,res)=>{
    const {body} = req;
    const { api } = req.params;
    const {login, pass} = body;
    if (login && pass){
        const user = User.updateUser(api,{login,pass});
        res.json({ payload: user });
    }
    else {
        res.sendStatus(400);
    }
}

exports.deleteUser = (req,res)=>{
    const { api } = req.params;
    User.deleteUser(api);
    res.json({payload: {api:api}});
}