/* app.js
 * This file provides the player and enemy class for the game.
 * It has the prototype render, reset, update methods on player and enemy objects.
 * It has also handleInputs, increase of enemies and eventlistener
 * methods.
 */
(function(window) {'use strict';
    var CHAR_BOY = 'images/char-boy.png';
    var ENEMY_IMG = 'images/enemy-bug.png';
    var INITIAL_SPEED = 100;
    var INITIAL_X = 202.5;
    var INITIAL_Y = 383;
    var TILE_WIDTH = 60;
    var TILE_HEIGHT = 60;
    var numEnemies = 0;

    // Enemies our player must avoid
    var Enemy = function(speed, x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.height = TILE_HEIGHT;
        this.sprite = ENEMY_IMG;
        this.speed = speed;
        this.width = TILE_WIDTH;
        this.x = x;
        this.y = y;
    };

    // Increase enemies when player wins the game
    var increaseEnemies = function() {
        numEnemies = numEnemies + 1;
        allEnemies.length = 0;

        // New set of enemies
        for (var i = 0; i <= numEnemies; i++) {
            var enemy = new Enemy(Math.random() * 256, 0, Math.random() * 184 + 50);
            allEnemies.push(enemy);
        }
    };

    // Class Player
    var Player = function(char, speed, x, y) {
        this.height = TILE_HEIGHT;
        this.speed = speed;
        this.sprite = CHAR_BOY;
        this.width = TILE_WIDTH;
        this.x = x;
        this.y = y;
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x =this.x + this.speed * dt;

        if (this.x >= 505) {
            this.x = -100;
        }
    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // This method moves the character when the arrow keys are pressed.
    Player.prototype.handleInput = function(keyPress) {
        switch(keyPress) {
            case 'left':
                this.x = this.x - this.speed;
                break;
            case 'up':
                this.y = this.y - this.speed + 15;
                break;
            case 'right':
                this.x = this.x + this.speed;
                break;
            case 'down':
                this.y = this.y + this.speed - 15;
                break;
            default:
                break;
        }
    };

    // This method display the player sprite
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // This method reset the characters position at the beggining
    Player.prototype.reset = function() {
        this.x = INITIAL_X;
        this.y = INITIAL_Y;
    };

    // This method update the players position prevent the player to cross the boundary
    Player.prototype.update = function() {
        // prevent player from moving beyond canvas  wall boundaries
        if (this.y > 383 ) {
            this.y = 383;
        }
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 2) {
            this.x = 2;
        }
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    var allEnemies = [];
    var player = new Player(CHAR_BOY, INITIAL_SPEED, INITIAL_X, INITIAL_Y);
    var enemy = new Enemy(Math.random() * 256, 0, Math.random() * 184 + 50);

    allEnemies.push(enemy);

    window.allEnemies = allEnemies;
    window.increaseEnemies = increaseEnemies;
    window.player = player;

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
})(window);