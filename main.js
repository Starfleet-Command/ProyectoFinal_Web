const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const router = express.Router();
var db = require('./db');

app.use(express.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.send('Página de inicio de nuestro Wiki');
});


app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname+'/login.html'));
});

app.post('/dbsignup', function(req, res) {
    var ok = db.dbConnect(req.body);
    if(ok===1){
        res.sendFile(path.join(__dirname+'/main.html'));
    }
});

app.post('/dblogin', function(req, res) {
    var ok = db.dbGetConnect(req.body);
    if(ok!=0){
        res.sendFile(path.join(__dirname+'/main.html'));
    }
    else{
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = app;