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

    scenario('Score raises by 10 when star collected', function () {
        var beforeScore = gameState.getScore();

        gameState.collectStar(gameState.player, gameState.stars.getAt(0));
        return gameState.getScore() === beforeScore + 10;
    });

    scenario('Star disappears when it is collected', function () {
        var starToCollect = gameState.stars.getAt(1);

        if (starToCollect.alive === false) {
            return false;
        }
        gameState.collectStar(gameState.player, starToCollect);
        return starToCollect.alive === false;
    });


    return suite;
});
