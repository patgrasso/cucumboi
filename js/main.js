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
    'inc/update',
    'units'
], function (Phaser, preload, create, update, units) {
    'use strict';

    app.MAXSCORE = 10;

    app.game = new Phaser.Game(800, 600, Phaser.AUTO, '',
        {
            preload: preload,
            create: create,
            update: update
        });

    app.listeners = {};

    app.fire = function (eventName) {
        if (app.listeners[eventName] instanceof Array) {
            app.listeners[eventName].forEach(function (func) {
                func();
            });
        }
    };

    app.on = function (eventName, callback) {
        if (app.listeners[eventName] === undefined) {
            app.listeners[eventName] = [];
        }
        app.listeners[eventName].push(callback);
    };


    app.on('gameload', function () {
        /*if (app.debug) {
            units.runTests();
        }*/
    });
});
