const express = require('express');
const nunjucks = require('nunjucks') ;

const app = express();
const port = 3000;

const routes = require('./routes');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', routes);

app.get('/',(req,res)=>{
    return res.render('_layout.html');
})

app.listen(port,()=>{
    console.log("App starts at",port);
});