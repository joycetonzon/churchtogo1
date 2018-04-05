
require('dotenv').config();

var express = require('express');

var app = express();

var func=require('./app')(app);
func(app);
app.listen(app.get('port'), () => {
    console.log(`My server is listening to PORT: ${app.get('port')}`);
});

