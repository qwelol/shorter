const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Hello settings');
})

router.post('/',(req,res)=>{
    console.log("settings post req:",req.body); 
    res.send('post accepted');
})

router.put('/',(req,res)=>{
    console.log("settings put req:",req); 
    res.send('put accepted');
})

router.delete('/',(req,res)=>{
    console.log("settings delete req:",req); 
    res.send('deleted');
})

module.exports = router