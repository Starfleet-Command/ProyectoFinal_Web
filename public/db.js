const MongoClient = require('mongodb').MongoClient;
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
            console.log(error);
        }
    },

    getCharacters: async function getCharacters()
    {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
            const collection = client.db("Users").collection("characters");
            var items = await collection.find({}).toArray();
            console.log(items);
            client.close();
            return items;
        }
        catch(error) {
            console.error(error);
            return 0;
        }

    },

    delCharacter: async function delCharacter(request)
    {
        try {
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
            const collection = client.db("Users").collection("characters");
            await collection.deleteOne({name:request.body.name});
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
            await collection.updateOne({name:request.body.oldName},{ $set: {name: request.body.newName}});
            client.close();
        }
        catch(error) {
            console.error(error);
            return 0;
        }

    }
};   



