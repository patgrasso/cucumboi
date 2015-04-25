/*global define*/

define(['test'], function (test) {
    'use strict';
    var gameState,
        suite = [];

    /**
     * scenario(string, function)
     * Takes a scenario name and a function that returns the result of the test
     */
    function scenario(name, func) {
        suite.push({
            name: name,
            run: func
        });
    }


    scenario('Setup', function () {
        gameState = test.request('game-state');
        return gameState !== undefined;
    });

    scenario('Score raises by 10 when cucumber collected', function () {
        var beforeScore = gameState.getScore();

        gameState.collectCucumber(gameState.player, gameState.cucumbers.getAt(0));
        return gameState.getScore() === beforeScore + 10;
    });

    scenario('Cucumber disappears when it is collected', function () {
        var cucumberToCollect = gameState.cucumbers.getAt(1);

        if (cucumberToCollect.alive === false) {
            return false;
        }
        gameState.collectCucumber(gameState.player, cucumberToCollect);
        return cucumberToCollect.alive === false;
    });


    return suite;
});
