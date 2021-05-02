var db = require('./db');
var api = require('./api');

module.exports = {

fillClasses: function fillClasses() {
    var select = document.getElementById("selectClass");
var classes= api.getClasses();
for (let i = 0; i < classes.length; i++) {
    var el = document.createElement("option");
    el.innerHTML = classes[i];
    el.value = classes[i];
    select.add(el);
    
}

}

}; 