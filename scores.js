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



module.exports = {
    insertScore: insertScore,
    getScore: getScore
};
