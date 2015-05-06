'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var scores = require('./scores');
var fs = require('fs');
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/highscores', function (req, res) {
    console.log(req.body);
    scores.insertScore(req.body.name, req.body.score, res);
});


app.listen(process.env.PORT || 8000);
