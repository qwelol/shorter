const express = require('express')
const router = express.Router()

const USERS = [{"id":1,"login":"admin","pass":"admin"}]
let ID = USERS.length;

router.get('/',(req,res)=>{
    return res.json({ payload: USERS });
})

router.get('/:id',(req,res)=>{
    const { id } = req.params;
    return res.json({ payload: USERS.find((user) => user.id === +id) });
})

router.post('/',(req,res)=>{
    const { body } = req;
    const { login, pass } = body;
    console.log("login",login,"pass",pass);
    ID++;
    const user ={
        id:ID,
        login,
        pass,
    }
    console.log("user",user);
    USERS.push(user)
    res.json({payload:user});
})

router.put('/:id',(req,res)=>{
    const {body} = req;
    const { id } = req.params;
    const {login, pas} = body;
    const user = USERS.find((user) => user.id === +id);
    Object.assign(user,{login, pas});
    res.json({ payload: user });
})

router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    const index = USERS.findIndex((user) => user.id === +id);
    USERS.splice(index,1);
    res.json({payload: {id:id}});
})


module.exports = router