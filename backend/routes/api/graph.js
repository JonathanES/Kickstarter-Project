const graph = require('../../src/graph');

module.exports = function (app) {
    //get
    app.get('/graph/category',graph.getStatsByCategory);
    app.get('/graph/country',graph.getStatsByCountry);
};