/*global define, app, $, document*/

define(['Phaser', 'inc/game-state'], function (Phaser, gameState) {
    'use strict';
    var endState = function (game) {};

    endState.prototype = {
        create : function () {
            var game = app.game;

            game.stage.backgroundColor = '#5E3F6B';

            this.buttontext = game.add.text(270, 100, 'You Win!', { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.buttontext = game.add.text(200, 300, 'Your score was ' + gameState.getScore(), { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.button = game.add.button(350, 500, 'startButton', function () { game.state.start('play'); }, this);
            this.button.anchor.setTo(0.5, 0.5);
            this.button.fixedToCamera = true;

            this.buttontext = game.add.text(0, 0, "Restart", { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.anchor.setTo(0.5, 0.5);

            this.button.addChild(this.buttontext);


            var form = document.createElement('form'),
                name = document.createElement('input'),
                submit = document.createElement('input');

            $(form).submit(function () {
                $('<input />').attr('type', 'hidden')
                    .attr('name', 'score')
                    .attr('value', gameState.getScore())
                    .appendTo(form);
                return true;
            });

            form.appendChild(name);
            form.appendChild(submit);
            document.body.appendChild(form);
        },

        update : function () {}

    };

    return endState;
});
