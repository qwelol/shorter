const express = require('express');

const Shorter = require('./shorter');

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    console.log(req.query);
    let url = req.query.url;
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
                                                res.send(url)
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
    // shorter.test();
})

app.listen(port,()=>{
    console.log("App starts at port",port);
});