/*global define, app, game*/

define(['Phaser'], function (Phaser) {
    'use strict';

    var player, platforms, cursors, ground, score, cucumbers, scoreText, sky, edgeTimer, jumpTimer, wasStanding,
        gameState = function (game) {};


    function collectcucumber(player, cucumber) {

        // Removes the cucumber from the screen
        cucumber.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
	
	function wrapPlatform(platform) {
	
	if (platform.body.velocity.x < 0 && platform.x <= -160)
        {
            platform.x = 640;
        }
    else if (platform.body.velocity.x > 0 && platform.x >= 640)
        {
            platform.x = -160;
        }	
	
	}
	
	function setFriction (player, platform){
	
		if (platform.key === 'ice-platform')
			{
				player.body.x -= this.platform.body.x - this.platform.body.prev.x;
			}
	
	}

    /**
     * gameState:create
     * [description]
     */
    gameState.prototype.create = function () {

        score = 0;
		edgeTimer = 0;
		jumpTimer = 0;
		wasStanding = false;
		
        // enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.game.physics.arcade.gravity.y = 800;

        // background
        this.game.stage.backgroundColor = '#2f9acc';
		//clouds
		this.game.sky = this.game.add.tileSprite(0, 0, 640, 480, 'clouds');
		this.game.sky.fixedToCamera = true;
		//trees
		this.game.add.sprite(0, 1906, 'trees');
		

        // platforms group contains the ground and the 2 ledges we can jump on
        this.game.platforms = this.game.add.physicsGroup();
        // enable physics for any object that is created in this group
        this.game.platforms.enableBody = true;
		//this.game.platforms.setAll('body.allowGravity', false);
		this.game.platforms.create(0, 64, 'ice-platform');
        this.game.platforms.create(200, 180, 'platform');
        this.game.platforms.create(400, 296, 'ice-platform');
        this.game.platforms.create(600, 412, 'platform');
		this.game.platforms.setAll('body.immovable', true);
		
		//var x = 0;
		//var y = 64;
		
		//for (var i = 0; i < 19; i++)
        //    {
        //        var type = i % 2 === 1 ? 'platform' : 'ice-platform';
        //        var platform = this.game.platforms.create(x, y, type);
		//		platform.key = type;
		//		

                //platform.body.velocity.x = 200 + Math.random() * 5;
		//		platform.body.immovable = true;
		//		platform.body.allowGravity = false;
				

                //  Inverse it?
         //       if (Math.random() > 0.5)
         //       {
         //           platform.body.velocity.x *= -1;
         //       }

         //       x += 200;

         //       if (x >= 600)
         //       {
        //            x = 0;
        //        }

         //       y+= 150;
         //   }

        // ground
        ground = this.game.platforms.create(0, this.game.world.height-1, 'ground');
        ground.scale.setTo(7, 2);
        ground.body.immovable = true;

        // player
        player = this.game.add.sprite(320, 200, 'dude');	
        // enable physics on the player
        this.game.physics.arcade.enable(player);
        // player physics properties
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
		this.camera.follow(player);
		


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
        for (var i = 0; i < 9; i++)
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
	
		this.game.sky.tilePosition.y = -(this.camera.y * 0.7);
		
		// wrap platforms
		//this.game.platforms.forEach(wrapPlatform, this.game.platforms);
		
		// collide player with the platforms 
		this.game.physics.arcade.collide(player, this.game.platforms, this.game.setFriction, null, this);

		// collide the cucumbers with the platforms
		this.game.physics.arcade.collide(cucumbers, this.game.platforms);

		// allows the player to collect cucumbers and have them get removed from the screen
        this.game.physics.arcade.overlap(cucumbers, player, collectcucumber);
		
        //  reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -200;
			
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 200;
			
        } else {
			player.body.velocity.x = 0;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -300;

        }
    };


    return gameState;
});
