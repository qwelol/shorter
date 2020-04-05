const fetch = require('node-fetch');
const FormData = require('form-data');
const sha1 = require('sha1');

// let url = "https://catcut.net/s/7HyJ"; 

async function catcutShort(url, adv="0"){
    const ID="2683";
    const SECRET_KEY="MI1ImUNi2uyC40HroU8ftqkUC68Ugxefee5SZ20BspLfdOQYhI0RKxaFRjx7XUh3ZcZDQVPCuEoRsLoAQdglKOyc6Ab0jBwpl287";

    const BASE_SHORT_URL="https://catcut.net/s/";

    let authString = url+ID+adv+SECRET_KEY;
    let hash = sha1(authString);
    // console.log("hash",hash);
    let formData = new FormData();
    formData.append("longurl",url);
    formData.append("id",ID);
    formData.append("advsurfing",adv);
    formData.append("hash",hash);
    let shortLink = await fetch('https://catcut.net/api/create.php',{
        method:'POST',
        body: formData
    }).then(res=>{
        return res.text();
    }).then(data=>{
        return BASE_SHORT_URL+data;  
    });
    return shortLink;
}

async function flShort(url){
    const API="91665adb3dd17bb4171ca8dc95f499d511849da9";
    let shortUrl=await fetch("http://fc.lc/api?api="+API+"&url="+url,{
    method:'GET'
    }).then(res=>{
        if(res.ok){
            return res.json()
        }
    }).then(data=>{
        return data.shortenedUrl;
    });
    return shortUrl;
}

async function shorteSt(url){

    const API="10b131139d5c29c3edf4ea8ca954f4a9";

    let shortUrl= await fetch("https://api.shorte.st/v1/data/url",{
        method:"PUT",
        headers:{
            "public-api-token": API,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:"urlToShorten="+url
    }).then(res=>{
        if (res.ok){
            return res.json();
        }
    }).then(data=>{
        return data.shortenedUrl;
    });
    return shortUrl;
}

async function exeShort(url){
    const API="4ee04f57808fe83ecc0d0f788194bee1b5cdaf07";
    let shortUrl=await fetch("https://exe.io/api?api="+API+"&url="+url,{
    method:'GET'
    }).then(res=>{
        if(res.ok){
            return res.json()
        }
    }).then(data=>{
        return data.shortenedUrl;
    });
    return shortUrl;
}
async function profitLinkShort(url){
    const API="de6f87113915671dfafac264492f3d22";
    let pUrl = url.match(/https:\/\/|http:\/\//)?url:"http://"+url;
    let shortUrl=await fetch("http://profit-link.ru/api.php?key="+API+"&url="+pUrl+"&ads=Y",{
    method:'GET'
    }).then(res=>{
        if(res.ok){
            return res.json()
        }
    }).then(data=>{
        return data.success;
    });
    return shortUrl;
}
async function q32Short(url){
    const API="DGlaAHxzD4TXl5YrtSIFHN6e84l0bk7mJ6dL4YDvupeJ0";
    let pUrl = url.match(/https:\/\/|http:\/\//)?url:"http://"+url;
    let shortUrl=await fetch("https://q32.link/api.php?key="+API+"&url="+pUrl,{
    method:'GET'
    }).then(res=>{
        if(res.ok){
            return res.text();
        }
    }).then(data=>{
        return data;
    });
    return shortUrl;
}

let Shorter = {
    catcutShort,
    flShort,
    shorteSt,
    exeShort,
    profitLinkShort,
    q32Short,
    test:()=>{
        console.log('Its ok!');
    },
}
module.exports = Shorter;
// flShort(url).then(url=>{
//     setTimeout(()=>(console.log("1")),5);
//     catcutShort(url).then(url=>{
//         setTimeout(()=>(console.log("2")),5);
//         shorteSt(url).then(url=>{
//             setTimeout(()=>(console.log("3")),5);
//             catcutShort(url).then(url=>{
//                 setTimeout(()=>(console.log("4")),5);
//                 exeShort(url).then(url=>{
//                     setTimeout(()=>(console.log("5")),5);
//                     catcutShort(url).then(url=>{
//                         setTimeout(()=>(console.log("6")),5);
//                         profitLinkShort(url).then(url=>{
//                             setTimeout(()=>(console.log("7")),5);
//                             catcutShort(url).then(url=>{
//                                 setTimeout(()=>(console.log("8")),5);
//                                 q32Short(url).then(url=>{
//                                     setTimeout(()=>(console.log("9")),5);
//                                     catcutShort(url).then(url=>{
//                                         console.log(url)
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

// let formData = new FormData();
// formData.append("link-curto",url);
// formData.append("mostra_ads","on");
// fetch('https://li-nk.me/ajax/geralink',{
//         method:'POST',
//         headers:{
//             "Content-Type": "text/html"
//         },
//         body: formData
//     }).then(res=>{
//         return res;
//     }).then(data=>{
//         console.log(data);
         
//     });

// q32Short(url).then(url=>{
//     console.log(url);
// });

// fetch("https://li-nk.me/ajax/geralink", {
//     "credentials":"include",
//     "headers":{
//         "accept":"text/html, */*; q=0.01",
//         "accept-language":"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-fetch-dest":"empty",
//         "sec-fetch-mode":"cors",
//         "sec-fetch-site":"same-origin",
//         "x-requested-with":"XMLHttpRequest"
//     },
//     "referrer":"https://li-nk.me/publisher",
//     "referrerPolicy":"no-referrer-when-downgrade",
//     "body":"link-curto=yandex.ru&mostra_ads=on",
//     "method":"POST",
//     "mode":"cors"
// }).then(res=>{
//     return res.text();
// }).then(data=>{
//     console.log(data);
// });;


