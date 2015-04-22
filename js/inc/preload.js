/*global define, app*/

define(function () {
    'use strict';

    return function () {
        var game = app.game;

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    };


});
