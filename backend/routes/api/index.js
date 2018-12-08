const api =require('express').Router();
const form = require('./form')(api);
const graph = require('./graph')(api);
module.exports = api;