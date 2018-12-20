const request = require("request");
const path = require('path')
const arrays = require(path.join(__dirname,"../data_processing/files/arrays.js"));
const uri = "https://ussouthcentral.services.azureml.net/workspaces/d404b57cee7b4af8a9be518cccea4e83/services/9e1fb031c33044c5b180377b1ab4ca9d/execute?api-version=2.0&details=true";
const oldApikey ="ZGn4JRTBwiWNc8WENmQt7p1QK6zEiFP+c1XPjFrO/H3Ty1kn6n3VvY1LaOIUas0dnQsgRahFT7KgJkPpZPoXdw==";
const apikey = "nGPIPahOtGew6WSzDeEcAaFTUZx4iDrn6VYjwr+837KEhX9UIW+PLO6g2uZgevvZQthIBnjNKftO3d2GRzH0nw==";

module.exports = {
    post: post,
    getCategory: getCategory,
    getCountry: getCountry
}
async function getCountry(req, res, next){
    res.status(200).json({
        "message":"request successful",
        data: arrays.countries.map(elt => elt.country)
    });
}

async function getCategory(req, res, next){
    res.status(200).json({
        "message":"request successful",
        data: arrays.categories.map(elt => elt.category)
    });}

function post(req,res,next){
    const category = req.body.category ? req.body.category : "";
    const state = "";
    //const backers = req.body.backers ? req.body.backers : 0;
    const country = req.body.country ? req.body.country : "";
    const days_before_deadline = req.body.days_before_deadline ? req.body.days_before_deadline : 0;
    const usd_goal_real = req.body.usd_goal_real ? req.body.usd_goal_real : 0;
    let data = {
        "Inputs": {
          "input1": {
            "ColumnNames": [
              "category",
              "state",
      //        "backers",
              "country",
              "usd_goal_real",
              "days_before_deadline"
            ],
            "Values": [
              [
                category,
                state,
        //        parseInt(backers),
                country,
                parseInt(usd_goal_real),
                parseInt(days_before_deadline)
              ]
            ]
          }
        },
        "GlobalParameters": {}
      }

    const options = {
        uri: uri,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey,
        },
        body: JSON.stringify(data)
    }
    
    request(options, (err, result, body) => {
        if (!err && result.statusCode == 200) {
            let data = JSON.parse(body).Results.output1.value;
            res.status(200).json({
                "message":"request successful",
                data: {
                    accuracy: data.Values[0][6],
                    value: data.Values[0][5]
                }
            });
        } else {
            console.log("The request failed with status code: " + res.statusCode);
        }
    });
}