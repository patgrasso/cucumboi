/*global define, app*/

define(function () {
    'use strict';

    return function () {
        var game = app.game;

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('cucumber', 'assets/cucumber.png');
        game.load.image('dude', 'assets/dude.png');
		game.load.image('trees', 'assets/trees.png');
		game.load.image('clouds', 'assets/clouds.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('ice-platform', 'assets/ice-platform.png');
    };


});
