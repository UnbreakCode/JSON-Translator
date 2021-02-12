const translate = require('@vitalets/google-translate-api');

const fruits = require('./fruits.json'); 
const editJsonFile = require("edit-json-file"); 
var fs = require('fs'); 
var filePath = './fruits.json';
let file = editJsonFile(filePath);
var data = JSON.parse(fs.readFileSync(filePath)); 
console.log(data);


async function translator() { 
    for (var object in data) {
        if (data.hasOwnProperty(object)) {      
            await translate(data[object], {to: 'en'}).then(res => { // languages can be found here by the official google api: https://github.com/matheuss/google-translate-api/blob/master/languages.js
                console.log("[TRANSLATING] - " + object +  " to -> " + res.text);               
                file.set(object, res.text)
                
            }).catch(err => {
                console.error(err);
            });
              
        }
    }
    file.save();
}

translator();