const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const router = express.Router();
var db = require('./public/db');


app.use(express.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.send('Página de inicio de nuestro Wiki');
});


app.get('/login', async function(req, res) {
    res.sendFile(path.join(__dirname+'/public/login.html'));
});

app.get('/createcharacter', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/character_create.html'));
});

app.post('/dbsignup', function(req, res) {
    var ok = db.dbConnect(req.body);
    if(ok===1){
        res.sendFile(path.join(__dirname+'/public/main.html'));
    }
});

app.post('/characterInsert', function(req, res) {
    var ok = db.characterInsert(req.body);
    res.sendFile(path.join(__dirname+'/public/main.html'));
});

app.post('/dblogin', async function(req, res) {
    var ok = await db.dbGetConnect(req.body);
    if(ok!=0){
        res.sendFile(path.join(__dirname+'/public/main.html'));
    }
    else{
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = app;