const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();
var db = require('./public/db');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/characters.html'));
});


app.get('/login', async function(req, res) {
    res.sendFile(path.join(__dirname+'/public/login.html'));
});

app.get('/createcharacter', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/character_create.html'));
});

app.get('/characters', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/characters.html'));
});


app.post('/characterInsert', function(req, res) {
    db.characterInsert(req);
    res.sendFile(path.join(__dirname+'/public/characters.html'));
});

app.get('/getcharacters', function(req, res) {
    db.getCharacters()
    .then(response => {console.log(response);
        res.json(response);})
    
    
});

app.post('/characterDelete', function(req, res) {
    db.delCharacter(req);
    res.status(200);
});

app.post('/characterEdit', function(req, res) {
    db.modCharacter(req);
    res.status(200);
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = app;