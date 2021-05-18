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

class ClassSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            // submit: ''
        }

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    getClassInfo(input) {
        return fetch("https://www.dnd5eapi.co/api/classes/"+input)
            .then(response => response.json())
            .then(responseJson => {
                var prof_amount = responseJson.proficiency_choices[0].choose;
                var skills = responseJson.proficiency_choices[0].from;
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

                var profText = document.getElementById("skillChoose");
                profText.innerHTML="You are proficient in up to "+prof_amount+" of the following:";

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
        )
    }
}

export default ClassSelection;