const express = require('express')
const router = express.Router()

const Shorter = require('../shorter');

router.get('/',(req,res)=>{
    console.log("req.query:",req.query);
    let { url } = req.query;
    if (url){
        Shorter.flShort(url).then(url=>{
            setTimeout(()=>(console.log("1")),5);
            Shorter.catcutShort(url).then(url=>{
                setTimeout(()=>(console.log("2")),5);
                Shorter.shorteSt(url).then(url=>{
                    setTimeout(()=>(console.log("3")),5);
                    Shorter.catcutShort(url).then(url=>{
                        setTimeout(()=>(console.log("4")),5);
                        Shorter.exeShort(url).then(url=>{
                            setTimeout(()=>(console.log("5")),5);
                            Shorter.catcutShort(url).then(url=>{
                                setTimeout(()=>(console.log("6")),5);
                                Shorter.profitLinkShort(url).then(url=>{
                                    setTimeout(()=>(console.log("7")),5);
                                    Shorter.catcutShort(url).then(url=>{
                                        setTimeout(()=>(console.log("8")),5);
                                        Shorter.q32Short(url).then(url=>{
                                            setTimeout(()=>(console.log("9")),5);
                                            Shorter.catcutShort(url).then(url=>{
                                                console.log("10");
                                                res.send(url);
                                            }); 
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    else {
        res.send("ERR: no url in query");
    }
    // Shorter.test();
})

router.post('/',(req,res)=>{
    res.send('post links');
})

module.exports = router