const path = require('path')
const arrays = require(path.join(__dirname,"../data_processing/files/arrays.js"));

module.exports = {
    getStatsByCategory: getStatsByCategory,
    getStatsByCountry: getStatsByCountry
}
async function getStatsByCountry(req, res, next){
    res.status(200).json({
        "message":"request successful",
        data: arrays.countries.map(elt => {return {stat: elt.stat, country: elt.country}})
    });
}

async function getStatsByCategory(req, res, next){
    res.status(200).json({
        "message":"request successful",
        data: arrays.categories.map(elt => {return {stat: elt.stat, category: elt.category}})
    });
}
