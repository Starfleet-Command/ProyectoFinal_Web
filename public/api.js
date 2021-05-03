const fetch = require("node-fetch");

module.exports = {
    getClasses: async function getClasses() {
        return fetch("https://www.dnd5eapi.co/api/classes")
            .then(response => response.json())
            .then(responseJson => {
                var classes = [];
                for (let index = 0; index < responseJson.results.length; index++) {
                    const element = responseJson.results[index];
                    classes.push(element.index);
                }
                return classes;
            })
            .catch(error => {
                console.error(error);
            });
    },

    getClass: async function getClass(body) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+body)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                var prof_amount = responseJson.proficiency_choices[0].choose;
                var skills = responseJson.proficiency_choices[0].from;
                var proficiencies = responseJson.proficiencies;
                var saving_throws = responseJson.saving_throws;
                var starting_equipment = responseJson.starting_equipment;
                var classData = [prof_amount,skills,proficiencies,saving_throws,starting_equipment];
                return classData;
            })
            .catch(error => {
                console.error(error);
            });
    },

    getLevel: async function getLevel(userClass,level) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+userClass+"/levels/"+level)
            .then(response => response.json())
            .then(responseJson => {
                var spells = responseJson.spellcasting;
                var features = responseJson.features;
                // var f_choices = responseJson.feature_choices;
                var class_specifics = responseJson.class_specific;  
                var ability_bonus = responseJson.ability_score_bonuses;
                var prof_bonus = responseJson.prof_bonus;
                var levelData = [spells,features,class_specifics];
                return levelData;
            })
            .catch(error => {
                console.error(error);
            });
    },

    getSpellsByLevel: async function getSpellsByLevel(body,level) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+body+"/spells/")
            .then(response => response.json())
            .then(function(responseJson) {
                var classpells = responseJson.results;
                var innerjoin = [];
                return fetch("https://www.dnd5eapi.co/api/spells?level="+level)
                .then(lvlresponse => lvlresponse.json())
                .then(lvlresponse => {
                    var lvlspells = lvlresponse.results;
            
                    for (let i = 0; i < classpells.length; i++) {

                        for (let j = 0; j < lvlspells.length; j++) {
                            const element = lvlspells[j].name;

                            if(classpells[i].name== element)
                        {
                            innerjoin.push(classpells[i]);
                        }

                        }
                        
                        
                    }
                    return innerjoin;
                })
            })
            .catch(error => {
                console.error(error);
            });
    },


};   