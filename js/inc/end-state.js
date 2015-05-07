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
            var submit_name  = '<form id="scoreForm"><input id="name" type="text" name="name" placeholder="Your Name Here"><input id="sub-butt" type="submit" value="Submit"></form> <a id="hs" href="/gethighscores/"> View High Scores </a>';
			container.innerHTML = submit_name;
            document.body.appendChild(container);
			document.getElementById("hs").setAttribute("style",
				"font-size: 15px; color: black; background: white; text-decoration: none; padding: 6px; border-radius: 2px; font-family: arial; margin-top: 15px; margin-left: 95px;");
            document.getElementById("sub-butt").setAttribute("style",
                "padding: 9px; position: absolute; top: 0px; left: 335px; background-color: white; border-radius: 2px; border: 2px;");
            document.getElementById("name").setAttribute("style",
                "font-size: 25px; display:inline-block; border-radius: 1px; padding: 2px;");
            document.getElementById("container").setAttribute("style", 
                "z-index: 999; position: absolute; top: 200px; left: 225px; font-size:25px;");

            $('#scoreForm').submit(function () {
                $.post('/highscores', {
                    name: this.name.value,
                    score: gameState.getScore()
                }, function (data, stat) {
                    if (stat === 'success') {
                        console.info('score received!');
                        $('#name').attr('disabled', 'true')
                            .css({ background: 'green' });
                    } else {
                        $('#name').css({ background: 'lightred' });
                    }
                });
                return false;
            });

            this.buttontext = game.add.text(250, 300, 'Your score was ' + gameState.getScore(), { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.button = game.add.button(380, 500, 'startButton', function () { game.state.start('play'); document.getElementById('container').parentNode.removeChild(container);}, this);
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
