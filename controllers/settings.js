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
    Settings.find({user_api:api}, (err, settings)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.json({payload:settings});
    }); 
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
                user_api,
                service
            }).lean().exec();
            if (record){
                return res.sendStatus(400);
            }
            record = new Settings ({
                user_api,
                service,
                params
            });
            record.save(err=>{
                if (err) console.log(err);
                console.log("record",record);
                return res.json({payload:record});
            });
        } catch (err) {
            console.log(err);
            return res.status(500);
        }
    }
    else {
        return res.sendStatus(400);
    }
}

exports.changeSettings = (req,res)=>{
    const { api , service} = req.params;
    const { params } = req.body;
    if (params){
        Settings.updateOne({
            user_api:api,
            service
        }, {
            params
        }, (err,result)=>{
            if (err) return res.sendStatus(400);
            return res.json({ payload: result });
        });
    }
    else {
        return res.sendStatus(400);
    }
}

exports.deleteSettings = (req,res)=>{
    const { api, service} = req.params;
    console.log( api,service);
    if ( api,service){
        Settings.deleteOne({user_api:api,service},(err,deleteResult)=>{
                if (err) return res.sendStatus(400);
                return res.json({payload: deleteResult.n});
            });
    } else {
        return res.sendStatus(400);
    }
}