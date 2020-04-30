const Settings = require("../models/settings");

exports.getSettings = (req,res)=>{
    Settings.find({}, (err, settings)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.render('settings.html',{settings});
    }); 
}

exports.getUserSettings = (req,res)=>{
    const { api } = req.params; 

    // return res.json({ payload: Settings.getSettings(api) });
}

exports.createSettings = async (req,res)=>{
    const { body } = req;
    console.log("body",body);
    const { service, params, user_api } = body;
    // !Settings.getAll().find((record) => record.user_api === user_api && record.service === service
    if (user_api && service && params){
        try {
            let record = await Settings.findOne({
                user_api:{
                    $regex:user_api
                    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                    .replace(/-/g, '\\x2d'),
                    $options: "i"
                },
                service:{
                    $regex:service
                    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                    .replace(/-/g, '\\x2d'),
                    $options: "i"
                }
            }).lean().exec();
            if (record){
                res.sendStatus(400);
            }
            record = new Settings ({
                user_api,
                service,
                params
            });
            record.save(err=>{
                if (err) console.log(err);
                res.json({payload:record});
                console.log("record",record);
            });
        } catch (err) {
            console.log(err);
            res.status(500);
        }
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