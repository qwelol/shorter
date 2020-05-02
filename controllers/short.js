const Shorter = require('../services/shorter');
const Link = require("../models/short.js");

const USER_API="91665adb3dd17bb4171ca8dc95f499d511849da9";
const SETTINGS = [
    {
        "service":"catcut",
        "params":{
            "id":"2683",
            "secretKey":"MI1ImUNi2uyC40HroU8ftqkUC68Ugxefee5SZ20BspLfdOQYhI0RKxaFRjx7XUh3ZcZDQVPCuEoRsLoAQdglKOyc6Ab0jBwpl287"
        }
    },
    {
        "service":"fl",
        "params":{
            "api":"91665adb3dd17bb4171ca8dc95f499d511849da9"
        }
    },
    {
        "service":"shortest",
        "params":{
            "api":"10b131139d5c29c3edf4ea8ca954f4a9"
        }
    },
    {
        "service":"exe",
        "params":{
            "api":"4ee04f57808fe83ecc0d0f788194bee1b5cdaf07"
        }
    },
    {
        "service":"profit",
        "params":{
            "api":"de6f87113915671dfafac264492f3d22"
        }
    },
    {
        "service":"q32",
        "params":{
            "api":"DGlaAHxzD4TXl5YrtSIFHN6e84l0bk7mJ6dL4YDvupeJ0"
        }
    }
];

exports.getShortLink = (req,res)=>{
    Link.find({}, (err, links)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.render('short.html',{links});
    });   
}

exports.postShortLink = async (req,res)=>{
    let longUrl = req.body.url;
    console.log("url",longUrl);
    if (longUrl && longUrl!==""){
        // Shorter.flShort(longUrl).then(url=>{
        //     setTimeout(()=>(console.log("1")),5);
        //     Shorter.catcutShort(url).then(url=>{
        //         setTimeout(()=>(console.log("2")),5);
        //         Shorter.shorteSt(url).then(url=>{
        //             setTimeout(()=>(console.log("3")),5);
        //             Shorter.catcutShort(url).then(url=>{
        //                 setTimeout(()=>(console.log("4")),5);
        //                 Shorter.exeShort(url).then(url=>{
        //                     setTimeout(()=>(console.log("5")),5);
        //                     Shorter.catcutShort(url).then(url=>{
        //                         setTimeout(()=>(console.log("6")),5);
        //                         Shorter.profitLinkShort(url).then(url=>{
        //                             setTimeout(()=>(console.log("7")),5);
        //                             Shorter.catcutShort(url).then(url=>{
        //                                 setTimeout(()=>(console.log("8")),5);
        //                                 Shorter.q32Short(url).then(url=>{
        //                                     setTimeout(()=>(console.log("9")),5);
    //                                     });
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
        let shortUrl= await Shorter.catcutShort(longUrl,"2683","MI1ImUNi2uyC40HroU8ftqkUC68Ugxefee5SZ20BspLfdOQYhI0RKxaFRjx7XUh3ZcZDQVPCuEoRsLoAQdglKOyc6Ab0jBwpl287").then(url=>{
            // console.log("10");
            return url;
        }); 
        if (shortUrl){
            let link = new Link({
                user_api:USER_API,
                long_url:longUrl,
                short_url:shortUrl,
                created_at: new Date()
            });
            link.save(err=>{
                if (err) return res.sendStatus(500);
                console.log("link",link);
                return res.json({payload:link});
            });
        } else {
            res.sendStatus(500);
        }
    }
    else {
        return res.sendStatus(400)
    }
}

exports.deleteShortLink = (req,res)=>{
    const { id} = req.params;
    console.log( id);
    if ( id){
        Link.findByIdAndDelete(id,(err,deleteResult)=>{
                if (err) return res.sendStatus(400);
                return res.json({payload: deleteResult});
            });
    } else {
        return res.sendStatus(400);
    }
}