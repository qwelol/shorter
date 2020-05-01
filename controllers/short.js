const Shorter = require('../services/shorter');
const Link = require("../models/short.js");

const USER_API="91665adb3dd17bb4171ca8dc95f499d511849da9";

exports.getShortLink = (req,res)=>{
    Link.find({}, (err, links)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.render('short.html',{links});
    });   
}

exports.postShortLink = (req,res)=>{
    let longUrl = req.body.url;
    console.log("url",longUrl);
    if (longUrl && longUrl!==""){
        Shorter.test();

        Shorter.flShort(longUrl).then(url=>{
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
                                                let link = new Link({
                                                    user_api:USER_API,
                                                    long_url:longUrl,
                                                    short_url:url,
                                                    created_at: new Date()
                                                });
                                                // res.json({payload:link});
                                                link.save(err=>{
                                                    if (err) console.log(err);
                                                    console.log("link",link);
                                                    return res.json({payload:link});
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
        });
     
    }
    else {
        return res.sendStatus(400)
    }
    // Shorter.test();
}

exports.deleteShortLink = (req,res)=>{
    const { api,url} = req.params;
    console.log( api,url);
    if ( api,url){
        Link.deleteOne({user_api:api, short_url:url},(err,deleteResult)=>{
                if (err) return res.sendStatus(400);
                return res.json({payload: deleteResult.n});
            });
    } else {
        return res.sendStatus(400);
    }
}