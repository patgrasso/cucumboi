'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;


mongoose.connect('mongodb://localhost/Cucumboi');


var Schema = mongoose.Schema;
var ScoreDetail = new Schema({
    name: String,
    score: Number
}, {
    collection: 'scores'
});
var ScoreDetails = mongoose.model('userInfo', ScoreDetail);


function insertScore(name, score, response) {
    ScoreDetails.update({
        name: name
    }, {
        $set: {
            score: score
        }
    }, {
        upsert: true
    }, function () {
        response.send(true);
    });
}


function getScore(name, callback) {
    ScoreDetails.findOne({
        name: name
    }, function (err, data) {
        if (err || !data) {
            callback(null);
        }
        callback(data.score);
    });
}


function getHighScores(count, callback) {
    ScoreDetails.find({
        $query: {},
        $orderby: { score: -1 },
        $maxScan: parseInt(count, 10)
    }, function (err, data) {
        if (err || !data) {
            callback(null);
        }
        console.log(data);
        callback(data);
    });
}



module.exports = {
    insertScore: insertScore,
    getHighScores: getHighScores,
    getScore: getScore
};
