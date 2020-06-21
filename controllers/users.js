const Users = require("../models/users.js");
const sha1 = require('sha1');

exports.getUsers = (req,res)=>{
    Users.find({}, (err, users)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.render('users.html',{users});
    }); 
}

exports.getUser = (req,res)=>{
    const { api } = req.params;
    Users.find({api}, (err, user)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.json({payload:user});
    }); 
    // return res.json({ payload: User.getUser(api) });
}

exports.createUser = async (req,res)=>{
    const { body } = req;
    console.log("body",body);
    const { login, pass } = body;
    // !Settings.getAll().find((record) => record.user_api === user_api && record.service === service
    if (login && pass){
        try {
            let user = await Users.findOne({
                login
            }).lean().exec();
            if (user){
                return res.sendStatus(400);
            }
            let count = await Users.find({}, (err, users)=>{
                if (err) {
                    console.log(err);
                    return res.sendStatus(400);
                }
                return users.length;
            }); 
            user = new Users ({
                api:sha1(count),
                login,
                pass
            });
            user.save(err=>{
                if (err) console.log(err);
                console.log("user",user);
                return res.json({payload:user});
            });
        } catch (err) {
            console.log(err);
            return res.status(500);
        }
    }
    else {
        return res.sendStatus(400);
    }
}

exports.changeUser = (req,res)=>{
    const {body} = req;
    const { api } = req.params;
    const {login, pass} = body;
    if (login && pass){
        Users.updateOne({
            api,
        }, {
            login,
            pass
        }, (err,result)=>{
            if (err) return res.sendStatus(400);
            return res.json({ payload: result });
        });
    }
    else {
        res.sendStatus(400);
    }
}

exports.deleteUser = (req,res)=>{
    const { api } = req.params;
    Users.deleteOne({api},(err,deleteResult)=>{
        if (err) return res.sendStatus(400);
        return res.json({payload: deleteResult.n});
    });
}