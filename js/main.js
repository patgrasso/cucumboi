/*global requirejs, app*/

requirejs.config({
    paths: {
        Phaser: 'lib/phaser.min'
    }
});

require([
    'Phaser',
    'inc/preload',
    'inc/create',
    'inc/update'
], function (Phaser, preload, create, update) {
    'use strict';

    app.game = new Phaser.Game(640, 480, Phaser.AUTO, '',
        {
            preload: preload,
            create: create,
            update: update
        });
});
