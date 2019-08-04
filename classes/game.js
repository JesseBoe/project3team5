var shortID = require('shortid');

module.exports = class Game {
    constructor() {
        this.id = shortID.generate();
        this.round = 0;
        this.state = "Unstarted";
        this.numberOfPlayers = 0;
        this.whosTurn = -1;
        this.hasStarted = false;
        this.players = [];
    }

    joinGame(player) {
        //Game has not started
        if (!this.hasStarted) {
            //Game is not full
            if (this.numberOfPlayers <= 4) {
                //Player has not already joined?
                if (this.players.indexOf(player) === -1) {
                    player.currentGame = this.id;
                    this.players.push(player);
                    this.numberOfPlayers++;
                    return true;
                }
            }
        }
        return false;
    }

    //We should call this any time a player switches their ready status.
    startGame() {
        //Game has not started
        if (!this.hasStarted) {
            this.players.forEach(player => {
                //If a player isnt ready return false
                if (!player.ready) {
                    return false;
                }
            });
            //Everyone is ready, is there more than one player?
            if (this.numberOfPlayers > 1) {
                return true;
            }
            return false;
        }
    }

    //This code assumes the game has not started yet..
    //Coding a leave game that functions while the game is
    //started will be much more complex
    leaveGame(player) {
        if (!this.hasStarted) {
            //Player is in game
            if (this.players.indexOf(player) !== -1) {
                this.players.splice(this.players.indexOf(player), 1);
                this.numberOfPlayers--;
            }
        }
    }
}