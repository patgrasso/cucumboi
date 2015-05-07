/*global define, app, $, document*/

define(['Phaser', 'inc/game-state'], function (Phaser, gameState) {
    'use strict';
    var endState = function (game) {};

    endState.prototype = {
        create : function () {
            var game = app.game;

            game.stage.backgroundColor = '#00B8E6';

            this.buttontext = game.add.text(315, 100, 'You Win!', { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

			/*var htmlbody = document.getElementsByTagName("BODY");
			var input = document.createElement('input'); 
			input.type = "text"; 
			input.setAttribute("id", "name");
			document.body.appendChild(input);
			document.getElementById("name").setAttribute(
				"style", "z-index: 999; position: absolute; top: 200px; left: 225px; font-size:25px;");
			*/
			var container = document.createElement('div');
			container.setAttribute('id', 'container');
			var submit_name  = '<form><input type="text" name="firstname" value="Your Name Here"><input type="submit" value="Submit"></form>';
			container.innerHTML = submit_name;
			document.body.appendChild(container);
			document.getElementById("container").setAttribute(
				"style", "z-index: 999; position: absolute; top: 200px; left: 225px; font-size:25px;");
			
			
            this.buttontext = game.add.text(250, 300, 'Your score was ' + gameState.getScore(), { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.button = game.add.button(380, 500, 'startButton', function () { game.state.start('play'); }, this);
            this.button.anchor.setTo(0.5, 0.5);
            this.button.fixedToCamera = true;

            this.buttontext = game.add.text(0, 0, "Restart", { font: "32px Arial", fill: "#000000", align: "center" });
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
