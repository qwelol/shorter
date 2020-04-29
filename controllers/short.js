const Shorter = require('../services/shorter');
const Link = require("../models/short.js");

const USER_API="91665adb3dd17bb4171ca8dc95f499d511849da9";

exports.getShortLink = (req,res)=>{
    let data = {
        links: Link.getAll(),
    }
    return res.render('short.html',data);
}

exports.postShortLink = (req,res)=>{
    let { url } = req.body;
    console.log("url",url);
    if (url && url!==""){
        Shorter.test();
        let link = new Link(USER_API,url);
        link.save();
        console.log("link",link);
        
        res.json({payload:link});
        // Shorter.flShort(url).then(url=>{
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
        //                                     Shorter.catcutShort(url).then(url=>{
        //                                         console.log("10");
        //                                         res.send(url);
        //                                     }); 
        //                                 });
        //                             });
        //                         });
        //                     });
        //                 });
        //             });
        //         });
        //     });
        // });
    }
    else {
        res.sendStatus(400)
    }
    // Shorter.test();
}