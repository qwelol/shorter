const express = require('express');

const app = express();
const port = 3000;

const routes = require('./routes');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.listen(port,()=>{
    console.log("App starts at",port);
});