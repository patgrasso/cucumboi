/*global define, app, game*/

define(['Phaser'], function (Phaser) {
    'use strict';

    var player, platforms, cursors, ground, ledge, score, scoreText,
        gameState = function (game) {};
		
	function collectStar (player, star) {

    // Removes the star from the screen
		star.kill();
	
	//  Add and update the score
		score += 10;
		scoreText.text = 'Score: ' + score;

	}

    /**
     * gameState:create
     * [description]
     */
    gameState.prototype.create = function () {
	
		var stars;

        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our app.game
        this.game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.game.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        ground = platforms.create(0, this.game.world.height - 64, 'ground');

        //  Scale it to fit the width of the app.game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // The player and its setting
        player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Our controls.
        cursors = this.game.input.keyboard.createCursorKeys();
		
		stars = this.game.add.group();

		stars.enableBody = true;

		//  Here we'll create 12 of them evenly spaced apart
		for (var i = 0; i < 12; i++)
		{
			//  Create a star inside of the 'stars' group
			var star = stars.create(i * 70, 0, 'star');

			//  Let gravity do its thing
			star.body.gravity.y = 6;

			//  This just gives each star a slightly random bounce value
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
    };

    /**
     * gameState:update
     * [description]
     */
    gameState.prototype.update = function () {

        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(player, platforms);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        } else {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -350;

        }
    };


    return gameState;
});
