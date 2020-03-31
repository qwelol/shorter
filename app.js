const fetch = require('node-fetch');
const FormData = require('form-data');
const sha1 = require('sha1');

let url = "google.com"; 

async function catcutShort(url, adv){
    const ID="2683";
    const SECRET_KEY="MI1ImUNi2uyC40HroU8ftqkUC68Ugxefee5SZ20BspLfdOQYhI0RKxaFRjx7XUh3ZcZDQVPCuEoRsLoAQdglKOyc6Ab0jBwpl287";

    const BASE_SHORT_URL="https://catcut.net/s/";

    let shortLink;
    let authString = url+ID+adv+SECRET_KEY;
    let hash = sha1(authString);
    console.log("hash",hash);
    let formData = new FormData();
    formData.append("longurl",url);
    formData.append("id",ID);
    formData.append("advsurfing",adv);
    formData.append("hash",hash);
    await fetch('https://catcut.net/api/create.php',{
        method:'POST',
        body: formData
    }).then(res=>{
        return res.text();
    }).then(data=>{
        shortLink = BASE_SHORT_URL+data;  
    });
    return shortLink;
}
catcutShort(url, "1").then(link=>{
    console.log(link);
})

