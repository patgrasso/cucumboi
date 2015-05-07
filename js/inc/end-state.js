/*global define, app*/

define(['Phaser', 'inc/game-state'], function (Phaser, gameState) {
    'use strict';
    var endState = function (game) {};

    endState.prototype = {
        create : function () {
            var game = app.game;

            game.stage.backgroundColor = '#00B8E6';

            this.buttontext = game.add.text(315, 100, 'You Win!', { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

			var container = document.createElement('div');
			container.setAttribute('id', 'container');
			var submit_name  = '<form><input id="name" type="text" name="firstname" placeholder="Your Name Here"><input id="sub-butt" type="submit" value="Submit"></form>';
			container.innerHTML = submit_name;
			document.body.appendChild(container);
			document.getElementById("sub-butt").setAttribute("style",
			"padding: 9px; position: absolute; top: 0px; left: 335px; background-color: white; border-radius: 2px; border: 2px;");
			document.getElementById("name").setAttribute("style",
				"font-size: 25px; display:inline-block; border-radius: 1px; padding: 2px;");
			document.getElementById("container").setAttribute("style", 
				"z-index: 999; position: absolute; top: 200px; left: 225px; font-size:25px;");
			
			
            this.buttontext = game.add.text(250, 300, 'Your score was ' + gameState.getScore(), { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.button = game.add.button(380, 500, 'startButton', function () { game.state.start('play'); }, this);
            this.button.anchor.setTo(0.5, 0.5);
            this.button.fixedToCamera = true;

            this.buttontext = game.add.text(0, 0, "Restart", { font: "32px Arial", fill: "#000000", align: "center" });
            this.buttontext.anchor.setTo(0.5, 0.5);

            this.button.addChild(this.buttontext);

        },

        update : function () {
        }

    }

    return endState;
})
