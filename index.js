
require('dotenv').config();

var express = require('express');
var winston = require('winston');


var app = express();

var func = require('./app/index.js');
func (app);

var port = process.env.PORT || 8000
app.listen(port, function() {
    console.log("My server is listening to PORT:" + port);
});