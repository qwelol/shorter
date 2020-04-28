const Settings = require("../models/settings");

exports.getSettings = (req,res)=>{
    var data = {
        settings: Settings.getAll()
    } ;
    return res.render('settings.html', data);
    // res.json({ payload:  });
}

exports.getUserSettings = (req,res)=>{
    const { api } = req.params;   
    return res.json({ payload: Settings.getSettings(api) });
}

exports.createSettings = (req,res)=>{
    const { body } = req;
    console.log("body",body);
    const { service, params, user_api } = body;
    if (user_api && service && params && !Settings.getAll().find((record) => record.user_api === user_api && record.service === service)){
        const record = new Settings (user_api, service, params);
        console.log("record",record);
        record.save();
        res.json({payload:record});
    }
    else {
        res.sendStatus(400);
    }
}

exports.changeSettings = (req,res)=>{
    const { api , service} = req.params;
    const { params } = req.body;
    if (params){
        const record = Settings.updateSettings(api,service,params);
        res.json({ payload: record });
    }
    else {
        res.sendStatus(400);
    }
}

exports.deleteSettings = (req,res)=>{
    const { api , service} = req.params;
    Settings.deleteSettings(api,service);
    res.json({payload: {api:api}});
}