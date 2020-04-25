const express = require('express')
const router = express.Router()
const sha1 = require('sha1');

const USERS = [{"login":"admin","pass":"admin", "api":"91665adb3dd17bb4171ca8dc95f499d511849da9"}]
let ID = USERS.length;

router.get('/',(req,res)=>{
    return res.json({ payload: USERS });
})

router.get('/:api',(req,res)=>{
    const { api } = req.params;
    return res.json({ payload: USERS.find((user) => user.api === api) });
})

router.post('/',(req,res)=>{
    const { body } = req;
    console.log("body",body);
    const { login, pass } = body;
    if (login && pass && !USERS.find((user) => user.login === login)){
        ID++;
        const user ={
            api:sha1(ID),
            login,
            pass,
        }
        console.log("user",user);
        USERS.push(user)
        res.json({payload:user});
    }
    else {
        res.sendStatus(400);
    }
})

router.put('/:api',(req,res)=>{
    const {body} = req;
    const { api } = req.params;
    const {login, pas} = body;
    if (login && pass){
        const user = USERS.find((user) => user.api === api);
        Object.assign(user,{login, pas});
        res.json({ payload: user });
    }
    else {
        res.sendStatus(400);
    }
})

router.delete('/:api',(req,res)=>{
    const { api } = req.params;
    const index = USERS.findIndex((user) => user.api === api);
    USERS.splice(index,1);
    res.json({payload: {api:api}});
})


module.exports = router