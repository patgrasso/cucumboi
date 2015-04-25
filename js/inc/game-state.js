/*global define, app, game*/

define(['Phaser'], function (Phaser) {
    'use strict';

    var player, platforms, cursors, ground, ledge, score, cucumbers, scoreText,
        gameState = function (game) {};


    function collectcucumber(player, cucumber) {

        // Removes the cucumber from the screen
        cucumber.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }

    /**
     * gameState:create
     * [description]
     */
    gameState.prototype.create = function () {

        score = 0;

        // enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // background
        this.game.add.sprite(0, 0, 'sky');

        // platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.game.add.group();
        // enable physics for any object that is created in this group
        platforms.enableBody = true;

        // ground
        ground = platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        // two ledges
        ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // player
        player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        // enable physics on the player
        this.game.physics.arcade.enable(player);
        // player physics properties
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);

		// initialize the score text
        scoreText = this.game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });

        // controls
        cursors = this.game.input.keyboard.createCursorKeys();

        cucumbers = this.game.add.group();
        cucumbers.enableBody = true;

        // create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            // create a cucumber inside of the 'cucumbers' group
            var cucumber = cucumbers.create(i * 70, 0, 'cucumber');
            cucumber.body.gravity.y = 500;
            cucumber.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    };

    /**
     * gameState:update
     * [description]
     */
    gameState.prototype.update = function () {

        //  collide the player and the cucumbers with the platforms
        this.game.physics.arcade.collide(player, platforms);
        this.game.physics.arcade.collide(cucumbers, platforms);

		// allows the player to collect cucumbers and have them get removed from the screen
        this.game.physics.arcade.overlap(cucumbers, player, collectcucumber);

        //  reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;
            //player.animations.play('left');
			
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;
            //player.animations.play('right');
			
        } else {
            //  Stand still
            //player.animations.stop();
			player.body.velocity.x = 0;
			player.frame = 0;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -350;

        }
    };


    return gameState;
});
