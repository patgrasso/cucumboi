/*global define, app*/

define([
    'inc/game-state',
    'inc/menu-state',
    'inc/end-state'
], function (gameState, menuState, endState) {
    'use strict';

    return function () {
        var game = app.game;

        game.state.add('play', gameState.gameState);
        game.state.add('end', endState);
        //game.state.add('menu', menuState);
        game.state.start('play', true, false);
    };
});
