const csvFilePath= __dirname+"/files/ks-projects-201801.csv";
const csv = require('csvtojson/v2')
const jsonexport = require('jsonexport');
const fs = require('fs');

async function getCategory(){
    const jsonArray = await csv().fromFile(csvFilePath);
    let set = new Set();
    jsonArray.forEach(elt => {
        set.add(elt.category);
    });
    let result = Array.from(set);
    console.log(result);
    fs.appendFile('categories.js', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

async function getState(){
    const jsonArray = await csv().fromFile(csvFilePath);
    let set = new Set();
    jsonArray.forEach(elt => {
        if(elt.state === "successful")
            set.add(elt.state);
    });
    let result = Array.from(set);
    console.log(result);
}

async function getCountry(){
    const jsonArray = await csv().fromFile(csvFilePath);
    let set = new Set();
    jsonArray.forEach(elt => {
        set.add(elt.country);
    });
    let result = Array.from(set);
    fs.appendFile('countries.js', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    console.log(result);
}

async function getStats(){
    const jsonArray = await csv().fromFile(csvFilePath);
    let arrayCategories = [];
    let arrayCountries = [];
    jsonArray.forEach(elt => {
        (elt.state == "canceled" || elt.state == "suspended" || elt.state == "undefined") ? elt.state = "failed" : elt.state;
        if (arrayCountries.find(obj => (obj.country === elt.country))){
            arrayCountries.map(obj => {
                if (obj.country === elt.country){
                    obj.total += 1;
                    obj.number_of_successful = (elt.state === "successful" ? obj.number_of_successful + 1 : obj.number_of_successful)
                    obj.stat = (obj.number_of_successful * 100) / obj.total;
                }
            });
        }
        else{
             elt.state === "successful" ? arrayCountries.push({country: elt.country, stat: 100, number_of_successful: 1, total: 1}) : arrayCountries.push({country: elt.country, stat:  0, number_of_successful: 0, total: 1})   
        }
        if (arrayCategories.find(obj => (obj.category === elt.category))){
            arrayCategories.map(obj => {
                if (obj.category === elt.category){
                    obj.total += 1;
                    obj.number_of_successful = (elt.state === "successful" ? obj.number_of_successful + 1 : obj.number_of_successful)
                    obj.stat = (obj.number_of_successful * 100) / obj.total;
                }
            });
        }
        else{
             elt.state === "successful" ? arrayCategories.push({category: elt.category, stat: 100, number_of_successful: 1, total: 1}) : arrayCategories.push({category: elt.category, stat:  0, number_of_successful: 0, total: 1})   
        }
    });
    fs.appendFile('arrays.js', "module.exports = { \n categories : " + JSON.stringify(arrayCategories) + ", \n countries: " + JSON.stringify(arrayCountries) + "\n }", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

async function getPositiveProjects(){
    let jsonArray = await csv().fromFile(csvFilePath);
    let set = new Set();
    jsonArray.forEach(elt => {
        (elt.state == "canceled" || elt.state == "suspended" || elt.state == "undefined") ? elt.state = "failed" : elt.state;
        if (elt.state === "successful")
            set.add(elt);
    });
    
    console.log((Array.from(set)).length);
    fs.appendFile('successfulProjects.txt', JSON.stringify(Array.from(set)), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

}

async function dataProcess(){
    let jsonArray = await csv().fromFile(csvFilePath);
    const oneDay = 24*60*60*1000;
    jsonArray.forEach(elt => {
        (elt.state == "canceled" || elt.state == "suspended" || elt.state == "undefined") ? elt.state = "failed" : elt.state;
        elt.state == "failed" ? elt.state = 0 : elt.state = 1;
        const firstDate = new Date(elt.launched);
        const secondDate = new Date(elt.deadline);
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        delete elt["launched"];
        delete elt["deadline"];
        elt["days_before_deadline"] = diffDays;
    })
    jsonArray = jsonArray.filter(elt => elt.state != "live");
    console.log("finished treating data ");
    jsonexport(jsonArray,function(err, csv){
        if(err) return console.log(err);
        console.log("finished the treatment of the jsonArray to csv");
        fs.appendFile('kickstarter.csv', csv, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    });
}

getStats();
//getPositiveProjects();
//dataProcess();
//getCategory();
//getCountry();
//getState();