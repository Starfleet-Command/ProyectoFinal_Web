var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://dndadmin:.DnDadm1n.@proyectofinal.heiln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = {

    characterInsert:  async function characterInsert(request) {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
          const collection = client.db("Users").collection("characters");
          var body = request.body;
          await collection.insertOne({ name: body.name, class: body.class,level:body.level,race:body.race,ability_scores:body.abilityScores,s_throws:body.saveThrows, skills:body.skills,proficiencies:body.proficiencies,hp:body.hp,languages:body.languages,traits:body.traits,speed:body.speed,ab:body.ability_bonus,pb:body.prof_bonus,feats:body.feats,spells:body.spells,spell_slots:body.spellSlots});          
          client.close();
        } catch (error) {
            console.error(error);
        }
    },

    getCharacters: async function getCharacters()
    {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
            const collection = client.db("Users").collection("characters");
            var data = await collection.find({}).toArray();
                return data;
            
        
        }
        catch(error) {
            console.error(error);
            return 0;
        }

    },

    delCharacter: async function delCharacter(request)
    {
        try {
            console.log(request.body.id);
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
            const collection = client.db("Users").collection("characters");
            const result = await collection.deleteOne({_id:ObjectID(request.body.id)});
            console.log(

                `deleted ${result.deletedCount} document(s)`,
          
              ); 
            client.close();
        }
        catch(error) {
            console.error(error);
            return 0;
        }

    },

    modCharacter: async function modCharacter(request)
    {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
            const collection = client.db("Users").collection("characters");
            const updateDoc = {

                $set: {
                  "name": request.body.name,
                },};
            const filter = {_id:ObjectID(request.body.id) };
            const options = { upsert: false };
            const result = await collection.updateOne(filter,updateDoc,options);
            console.log(

                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          
              );        
            await client.close();
        }
        catch(error) {
            console.error(error);
            return 0;
        }

    }
};   



