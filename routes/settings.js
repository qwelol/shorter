const express = require('express')
const router = express.Router()

const USER_SETTINGS = [
    {
        "user_api":"91665adb3dd17bb4171ca8dc95f499d511849da9",
        "service":"catcut",
        "params":{"secret_key":"MI1ImUNi2uyC40HroU8ftqkUC68Ugxefee5SZ20BspLfdOQYhI0RKxaFRjx7XUh3ZcZDQVPCuEoRsLoAQdglKOyc6Ab0jBwpl287","id":"2683"}
    },
    {
        "user_api":"91665adb3dd17bb4171ca8dc95f499d511849da9",
        "service":"fl",
        "params":{"api":"91665adb3dd17bb4171ca8dc95f499d511849da9"}
    },
    {
        "user_api":"91665adb3dd17bb4171ca8dc95f499d511849da1",
        "service":"fl",
        "params":{"api":"91665adb3dd17bb4171ca8dc95f499d511849da9"}
    }
]

router.get('/',(req,res)=>{
    return res.json({ payload: USER_SETTINGS });
})

router.get('/:api',(req,res)=>{
    const { api } = req.params;
    console.log("api",api);
    
    return res.json({ payload: USER_SETTINGS.filter((user) => user.user_api === api) });
})

router.post('/',(req,res)=>{
    const { body } = req;
    console.log("body",body);
    const { service, params, user_api } = body;
    if (user_api && service && params && !USER_SETTINGS.find((record) => record.user_api === user_api && record.service === service)){
        const record ={
            user_api,
            service,
            params,
        }
        console.log("record",record);
        USER_SETTINGS.push(record)
        res.json({payload:record});
    }
    else {
        res.sendStatus(400);
    }
})

router.put('/:api&&:service',(req,res)=>{
    const { api , service} = req.params;
    const { params } = req.body;
    if (params){
        const record = USER_SETTINGS.find((record) => record.user_api === api && record.service === service);
        Object.assign(record,{params});
        res.json({ payload: record });
    }
    else {
        res.sendStatus(400);
    }
})

router.delete('/:api&&:service',(req,res)=>{
    const { api , service} = req.params;
    const index = USER_SETTINGS.findIndex((record) => record.user_api === api && record.service === service);
    USER_SETTINGS.splice(index,1);
    res.json({payload: {api:api}});
})

module.exports = router