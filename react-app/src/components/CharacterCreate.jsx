import React, { Component } from 'react';
import { makeStyles, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

var character = {};
var class_profs = [];
// getClasses(); // These functions help populate the options for classes, races, etc
// getRaces();
character.proficiencies = [];
character.abilityScores = [];
// addLevels();
// pointBuySetup();

class ClassSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.fillSkillChoose = this.fillSkillChoose.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value 
        })

        // console.log(event);
        this.getClassInfo(event.target.value);
        this.props.parentCallback(this.input);
    }

    fillSkillChoose(props) {
        return (
            <div>
                <p>
                    You are proficient in up to {props.prof_amount} of the following
                </p>
            </div>
        );
    }

    // fillProfs(props) {
    //     return (
    //         <div id="profs">
    //             <br> <b> Because of your class </b>
    //             <br>
    //             <br> You are proficient with the following items: <br>
    //         </div>
    //     );
    // }

    async getClassInfo(input) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+input)
            .then(response => response.json())
            .then(responseJson => {
                // console.log(responseJson);
                var prof_amount = responseJson.proficiency_choices[0].choose;
                var skills = responseJson.proficiency_choices[0].from;
                // console.log(prof_amount);
                var proficiencies = responseJson.proficiencies;
                var saving_throws = responseJson.saving_throws;
                var starting_equipment = responseJson.starting_equipment;
                var hitdice = responseJson.hit_die;

                character.hp=hitdice;
                character.class=input;
                class_profs = [];
                character.saveThrows = [];
                character.equipment = [];
                character.proficiencies.amount = prof_amount;
                
                // console.log(prof_amount);

                this.fillSkillChoose(prof_amount);

                // var profText = document.getElementById("skillChoose");
                // profText.innerHTML="You are proficient in up to "+prof_amount+" of the following:";

                var selectSkills = document.getElementById("selectSkills");
                selectSkills.innerHTML="";
                

                for (let index = 0; index < skills.length; index++) {
                    var checkbox = document.createElement('input');
                    checkbox.id = "skillCheckbox"+index;
                    checkbox.type = "checkbox";
                    checkbox.value = 1;
                    checkbox.name = skills[index].index;
                    selectSkills.appendChild(checkbox);
                    selectSkills.appendChild(document.createTextNode(skills[index].name));
                    selectSkills.innerHTML+="<br>"
                }
                
                var profs = document.getElementById("profs");
                profs.innerHTML="";
                profs.innerHTML += "<br> <b> Because of your class </b><br><br>You are proficient with the following items: <br>"
                for (let index = 0; index < proficiencies.length; index++) {
                    profs.innerHTML+= proficiencies[index].name + "<br>";
                    class_profs.push(proficiencies[index].name);
                }

                var saves = document.getElementById("throws");
                saves.innerHTML="";
                saves.innerHTML += "<br>You are proficient in the following saving throws: <br>"

                for (let index = 0; index < saving_throws.length; index++) {
                    saves.innerHTML+= saving_throws[index].name + "<br>";

                    character.saveThrows.push(saving_throws[index].name);
                }

                var equip = document.getElementById("equipment");
                equip.innerHTML="";
                equip.innerHTML += "<br>You start with the following equipment: <br>"

                for (let index = 0; index < starting_equipment.length; index++) {
                    equip.innerHTML+= starting_equipment[index].equipment.name + "<br>";
                    character.equipment.push(starting_equipment[index].equipment.name);
                }
                
            })
            
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <FormControl className={useStyles.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Class</InputLabel>
                <Select value={this.state.input} onChange={this.handleChange}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value='barbarian'>Barbarian</MenuItem>
                    <MenuItem value='bard'>Bard</MenuItem>
                    <MenuItem value='cleric'>Cleric</MenuItem>
                    <MenuItem value='druid'>Druid</MenuItem>
                    <MenuItem value='fighter'>Fighter</MenuItem>
                    <MenuItem value='monk'>Monk</MenuItem>
                    <MenuItem value='paladin'>Paladin</MenuItem>
                    <MenuItem value='ranger'>Ranger</MenuItem>
                    <MenuItem value='rogue'>Rogue</MenuItem>
                    <MenuItem value='sorcerer'>Sorcerer</MenuItem>
                    <MenuItem value='warlock'>Warlock</MenuItem>
                    <MenuItem value='wizard'>Wizard</MenuItem>
                </Select>
                <FormHelperText>Select your class</FormHelperText>
            </FormControl>
        );
    }
};

class LevelSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: '',
            userClass: this.props.parentToChild
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            level: event.target.value
        })
        
        this.getLevel(this.userClass, this.level);
        
    }

    async getSpellsByLevel(userClass, level) {
        try {
            const response = await fetch("https://www.dnd5eapi.co/api/classes/" + userClass + "/spells/");
            const responseJson = await response.json();
            var classpells = responseJson.results;
            const lvlresponse = await fetch("https://www.dnd5eapi.co/api/spells?level=" + level);
            const lvlresponse_1 = await lvlresponse.json();
            var lvlspells = lvlresponse_1.results;
            var innerjoin = [];
            for (let i = 0; i < classpells.length; i++) {

                for (let j = 0; j < lvlspells.length; j++) {
                    const element = lvlspells[j].name;

                    if (classpells[i].name === element) {
                        innerjoin.push(classpells[i]);
                    }

                }


            }
            return innerjoin;
        } catch (error) {
            console.error(error);
        }
    }

    async getLevel(userClass, level) {
        if(userClass!=="Choose a class") {
            character.level = level;
        return fetch("https://www.dnd5eapi.co/api/classes/"+userClass+"/levels/"+level)
            .then(response => response.json())
            .then(responseJson => {
                var spells = responseJson.spellcasting;
                var features = responseJson.features;
                var class_specifics = responseJson.class_specific;  
                var ability_bonus = responseJson.ability_score_bonuses;
                var prof_bonus = responseJson.prof_bonus;

                character.ability_bonus = ability_bonus;
                character.prof_bonus = prof_bonus;
                character.feats = [];
                character.spellSlots = [];

                var ab = document.getElementById("abilityBonus")
                ab.innerHTML= "<br>Your ability scores (INT, DEX, etc) get a bonus of +"+ability_bonus;

                var pb = document.getElementById("scoreBonus")
                pb.innerHTML= "<br>Skills you are proficient in get a bonus of +"+prof_bonus;

                var fts = document.getElementById("feats");
                fts.innerHTML="";
                fts.innerHTML+= "<br> You have the following features (consult a 5e manual for more info) <br>";
                if(features.length>0)
                {
                    for (let index = 0; index < features.length; index++) {
                    fts.innerHTML+=features[index].name+"<br>";
                    character.feats.push(features[index].name);
                }
                }


                var sp = document.getElementById("spells");
                sp.innerHTML="";
                if(spells!==undefined){
                    sp.innerHTML= "<br>You have the following spell slots (plus those added by your spellcasting modifier):";
                    var spellLevels=[];
                    var spellLists = [];
                    var spellno = 0;
                for (let index = 0; index < Object.values(spells).length; index++) {
                    if(Object.values(spells)[index]!==0)
                    {
                        sp.innerHTML+= "<br>Level "+index + ": "+Object.values(spells)[index];
                        character.spellSlots.push(Object.values(spells)[index]);
                        spellLevels.push(index);
                        spellno+=parseInt(Object.values(spells)[index]);
                    }
                }
                
                var sa = document.getElementById("spellAmount");
                sa.innerHTML= "<br>You may choose up to "+spellno+" spells, in the proportion specified above <br><br>";

                var selectSpells = document.getElementById("selectSpells");

                for (const key in spellLevels) {
                        spellLists = this.getSpellsByLevel(userClass,key);
                        spellLists.then((a) => {
                            var spellNames=[];
                            for (const name in a) {
                                spellNames.push(a[name].name);
                                    
                            }
                            if(document.getElementById("level"+key)==null)
                            {
                                var div = document.createElement('div');
                                div.id = 'level'+key;
                                div.innerHTML= "Level "+key+"<br>";
                            }
                            else{
                                div = document.getElementById("level"+key);
                                div.innerHTML= "Level "+key+"<br>";
                                
                            }
                                

                            for (let index = 0; index < spellNames.length; index++) {
                                var checkbox = document.createElement('input');
                                checkbox.type = "checkbox";
                                checkbox.value = 1;
                                checkbox.name = spellNames[index];
                                div.appendChild(checkbox);
                                div.appendChild(document.createTextNode(spellNames[index]));
                                div.innerHTML += "<br>"
                            }
                            div.innerHTML += "<br>"
                            selectSpells.append(div);
                        });
                        
                    }
                
                    

            }
                var cs = document.getElementById("classSpecs");
                cs.innerHTML="";
                cs.innerHTML="Any other class variables or restrictions (i.e Wild Shape's restrictions) are shown here:"
                for (let index = 0; index < Object.values(class_specifics).length; index++) {
                    if(Object.values(class_specifics)[index]!==0 || Object.values(class_specifics)[index]!=="[]" )
                    {
                        cs.innerHTML+="<br>"+Object.keys(class_specifics)[index]+": "+Object.values(class_specifics)[index]
                    }
                    
                }

            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    render() {
        return (
            <FormControl className={useStyles.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                <Select value={this.state.level} onChange={this.handleChange}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="13">13</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="17">17</MenuItem>
                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="19">19</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                </Select>
                <FormHelperText>Select your level</FormHelperText>
            </FormControl>
        );
    }
};

class RaceSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            race: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            race: event.target.value
        })

        this.getRaceInfo(this.race);
    }

    async getRaceInfo(race){
        if(race!=="Choose your race")
        {
            return fetch("https://www.dnd5eapi.co/api/races/"+race)
                .then(response => response.json())
                .then(responseJson => {
                    
                    var ability_bonuses = responseJson.ability_bonuses;
                    var speed = responseJson.speed;
                    var start_profs = responseJson.starting_proficiencies;
                    var languages = responseJson.languages;
                    var traits = responseJson.traits;

                    var bonuses = []
                    for (let index = 0; index < ability_bonuses.length; index++) {
                        // const name = ability_bonuses[index].ability_score.index;
                        const amount = ability_bonuses[index].bonus;
                        const kvp = {name:amount};
                        bonuses.push(kvp);
                    }

                    character.race=race;
                    character.speed= speed;
                    character.ability_bonuses = ability_bonuses;
                    character.languages = [];
                    character.traits = [];
                    var race_profs = [];
                    var racials=document.getElementById("racialTraits");
                    racials.innerHTML="<br><b>Because of your race, </b><br>";

                    racials.innerHTML+="You have a speed of: "+speed+"ft/turn <br><br>";
                    racials.innerHTML+="You know the following languages: <br>";
                    for (let index = 0; index < languages.length; index++) {
                        racials.innerHTML+= languages[index].name+"<br>";
                        character.languages.push(languages[index].name);
                    }

                    racials.innerHTML+="<br> You have the following traits: <br>";
                    for (let index = 0; index < traits.length; index++) {
                        racials.innerHTML+= traits[index].name+"<br>";
                        character.traits.push(traits[index].name);
                    }

                    racials.innerHTML+="<br> You are naturally proficient in the following: <br>";
                    for (let index = 0; index < start_profs.length; index++) {
                        racials.innerHTML+= start_profs[index].name+"<br>";
                        race_profs.push(start_profs[index].name);
                    }
                    })
                
                .catch(error => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <FormControl className={useStyles.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Race</InputLabel>
                <Select value={this.state.race} onChange={this.handleChange}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="dragonborn">Dragonborn</MenuItem>
                    <MenuItem value="dwarf">Dwarf</MenuItem>
                    <MenuItem value="elf">Elf</MenuItem>
                    <MenuItem value="gnome">Gnome</MenuItem>
                    <MenuItem value="half-elf">Half-Elf</MenuItem>
                    <MenuItem value="half-orc">Half-Orc</MenuItem>
                    <MenuItem value="halfling">Halfling</MenuItem>
                    <MenuItem value="human">Human</MenuItem>
                    <MenuItem value="tiefling">Tiefling</MenuItem>
                </Select>
                <FormHelperText>Select your race</FormHelperText>
            </FormControl>
        );
    }
};

class CharacterCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userClass: null
        }

        this.handleCallback = this.handleCallback.bind(this);
    }

    handleCallback = (childData) => {
        this.setState({
            userClass: childData
        })
    }

    render() {
        const {userClass} = this.state;

        return (
            <div>
                <title>Character Creation</title>

                <ClassSelection parentCallback = {this.handleCallback}/> 
                {userClass}

                <LevelSelection parentToChild = {userClass}/>

                <RaceSelection />
            </div>
        );
    }
};

export default CharacterCreate;