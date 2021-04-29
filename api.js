module.exports = {
    getClasses: async function getClasses() {
        return fetch("https://www.dnd5eapi.co/api/classes")
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                return responseJson;
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
                var prof_amount = responseJson.proficiency_choices["choose"];
                var skills = responseJson.proficiency_choices["from"];
                var proficiencies = responseJson.proficiencies;
                var saving_throws = responseJson.saving_throws;
                var starting_equipment = responseJson.starting_equipment;
                
            })
            .catch(error => {
                console.error(error);
            });
    },

    getLevel: async function getLevel(body,class_) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+body+"/"+class_)
            .then(response => response.json())
            .then(responseJson => {
                var spells = responseJson.spellcasting;
                var features = responseJson.features;
                // var f_choices = responseJson.feature_choices;
                var class_specifics = responseJson.class_specific;  
            })
            .catch(error => {
                console.error(error);
            });
    },

    getSpellsByLevel: async function getSpellsByLevel(body,level) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+body+"/"+"spells/")
            .then(response => response.json())
            .then(function(responseJson) {
                var classpells = JSON.parse(responseJson.results);
                return fetch("https://www.dnd5eapi.co/api/spells?level="+level)
                .then(lvlresponse => lvlresponse.json())
                .then(lvlresponse => {
                    var lvlspells = JSON.parse(lvlresponse.results);
                    var innerjoin = [];
                    for (let index = 0; index < classpells.length; index++) {
                        if(classpells[index] in lvlspells)
                        {
                            innerjoin.append(classpells[index]);
                        }
                        
                    }
                })
            })
            .catch(error => {
                console.error(error);
            });
    },


};   