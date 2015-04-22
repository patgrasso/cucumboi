/*global define, app*/

define([
    'inc/game-state',
    'inc/menu-state'
], function (gameState, menuState) {
    'use strict';

    return function () {
        var game = app.game;

        game.state.add('play', gameState);
        //game.state.add('menu', menuState);
        game.state.start('play', true, false);
    };
});
