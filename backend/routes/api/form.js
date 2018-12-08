const form = require('../../src/form');

module.exports = function (app) {
    //get
    app.get('/form/category',form.getCategory);
    app.get('/form/country',form.getCountry);
    // post to retrieve data from portail azure 
    app.post('/form', form.post);
};