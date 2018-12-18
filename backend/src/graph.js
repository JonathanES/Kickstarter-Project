const path = require('path')
const arrays = require(path.join(__dirname,"../data_processing/files/arrays.js"));

module.exports = {
    getStatsByCategory: getStatsByCategory,
    getStatsByCountry: getStatsByCountry
}
async function getStatsByCountry(req, res, next){
    arrays.countries = arrays.countries.sort(function(a, b) {
        return a.stat - b.stat;
      });
    res.status(200).json({
        "message":"request successful",
        data: arrays.countries.map(elt => {return {stat: parseFloat(Math.round(elt.stat * 100) / 100).toFixed(2), country: elt.country, totalNumber: elt.total}})
    });
}

async function getStatsByCategory(req, res, next){
    arrays.categories = arrays.categories.sort(function(a, b) {
        return a.stat - b.stat;
    });
    res.status(200).json({
        "message":"request successful",
        data: arrays.categories.map(elt => {return {stat: parseFloat(Math.round(elt.stat * 100) / 100).toFixed(2), category: elt.category, totalNumber: elt.total}})
    });
}
