const USER_SETTINGS = [
    {
        "user_api":"91665adb3dd17bb4171ca8dc95f499d511849da9",
        "service":"catcut",
        "params":{"api":"MI1ImUNi2uyC40HroU8ftqkUC68Ugxefee5SZ20BspLfdOQYhI0RKxaFRjx7XUh3ZcZDQVPCuEoRsLoAQdglKOyc6Ab0jBwpl287","id":"2683"}
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

module.exports = class Settings{
 
    constructor(user_api, service,params){
        this.user_api = user_api;
        this.service = service;
        this.params = params;
    }
    save(){
        USER_SETTINGS.push(this);
    }
    static getSettings(api){
        return USER_SETTINGS.filter((user) => user.user_api === api);
    }
    static updateSettings(api,service,params){
        const record = USER_SETTINGS.find((record) => record.user_api === api && record.service === service);
        Object.assign(record,{params});
        return record;
    }
    static deleteSettings(api,service){
        const index = USER_SETTINGS.findIndex((record) => record.user_api === api && record.service === service);
        USER_SETTINGS.splice(index,1);
        return api;
    }
    static getAll(){
        return USER_SETTINGS;
    }
}