const LINKS = [
    {
        "id":1,
        "user_api":"91665adb3dd17bb4171ca8dc95f499d511849da9",
        "url":"http://catcut.net/ZKxI",
        "created_at": new Date().toDateString(),
    }
]
let ID = LINKS.length;

module.exports = class Short{
 
    constructor(user_api, url){
        this.id = ID;
        this.user_api = user_api;
        this.url = url;
        this.created_at = new Date().toDateString();
    }
    save(){
        LINKS.push(this);
    }
    static getLinks(api){
        return LINKS.filter((link) => link.user_api === api);
    }
    static deleteSettings(id){
        const index = LINKS.findIndex((record) => record.id === id );
        LINKS.splice(index,1);
        return id;
    }
    static getAll(){
        return LINKS;
    }
}