const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const uri = "";
   // mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
   // var db = mongoose.connection;
   // db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = {
    dbConnect:  async function dbConnect(body) {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
          const collection = client.db("Users").collection("users");
          await collection.insertOne({ user: body.uname, password: body.pwd});          
          client.close();
          return 1;
        } catch (error) {
            console.log(error);
        }
    },

    characterInsert:  async function characterInsert(body) {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
          const collection = client.db("Users").collection("characters");
          await collection.insertOne({ name: body.name, class: body.class,level:body.level,race:body.race,ability_scores:body.abilityScores,s_throws:body.saveThrows, skills:body.skills,proficiencies:body.proficiencies,hp:body.hp});          
          client.close();
        } catch (error) {
            console.log(error);
        }
    },

    dbGetConnect:  async function dbGetConnect(body) {
        try {
          const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
          const collection = client.db("Users").collection("users");
          var items = await collection.find({ user: body.uname, password: body.pwd}).toArray();

          if(items.length==0 || typeof items == undefined)
          {
              throw new Error("User not found");
          }          
          client.close();
        } catch (error) {
            console.error(error);
            return 0;
        }
    }
};   



