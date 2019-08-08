var shortID = require('shortid');

module.exports = class Game {
    constructor() {
        this.id = shortID.generate();
        this.round = 1;
        this.gameState = "Unstarted";
        this.gameStateEnum = ["Unstarted", "Spinning Wheel", "Wheel Is Spinning", "Selecting Consonant", "Selecting Action", "Buy Vowel", "Solving", "Showing Letters", "Finished"]
        this.numberOfPlayers = 0;
        this.whosTurn = -1;
        this.turnCount = 0;
        this.hasStarted = false;
        this.consonantsGuessed = 0;
        this.vowelsGuessed = 0;

        this.players = [];

        this.puzzle = "";
        this.puzzleCheat = "Luke, I am your father!"
        this.hint = "StarWars";
        this.disabledLetters = [];
        this.onlyVowels = false;
        this.timeRemaining = 10;
        this.currentWheelValue;
        this.spinResolved = true;
    }

    joinGame(player) {
        //Game has not started
        if (!this.hasStarted) {
            //Game is not full
            if (this.numberOfPlayers <= 3) {
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

    start() {
        this.puzzle = this.processPuzzle(this.puzzleCheat);
        this.hasStarted = true;
        this.gameState = "Spinning Wheel";
        this.whosTurn = 0;
    }

    isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
    }

    nextTurn() {
        this.whosTurn++;
        this.turnCount++;
        if (this.whosTurn >= this.numberOfPlayers) {
            this.whosTurn = 0;
        }
        if (this.turnCount > this.numberOfPlayers) {
            this.gameState = "Selecting Action";
        } else {
            this.gameState = "Spinning Wheel";
        }
    }

    processPuzzle(str) {        
        let hiddenString = "";
        str.split('').map((letter) => {
            if (this.isLetter(letter)) {
                hiddenString = hiddenString + "_";
            } else {
                hiddenString = hiddenString + letter;
            }
        })
        return hiddenString;
    }

    puzzleSolved() {
        if (this.puzzle == this.puzzleCheat) {
            return true;
        }
        return false;
    }

    puzzleGuessed(guess) {
        if (guess == this.puzzleCheat) {
            return true;
        }
        return false;
    }

    endRound() {
        this.players.forEach(player => {
            player.totalCash += player.cash;
            player.cash = 0;
        });
    }

    endGame() {
        this.players.sort(function(a, b) {return b.totalCash - a.totalCash});
    }

    getNewPuzzle() {
        this.puzzleCheat = "Luke, I am your father!";
        this.puzzle = this.processPuzzle(this.puzzleCheat);
        this.disabledLetters = [];
        this.turnCount = 0;
        this.consonantsGuessed = 0;
        this.vowelsGuessed = 0;
        this.onlyVowels = false;
        this.gameState = "Spinning Wheel";
        this.round++;
        this.spinResolved = true;
    }

    showLetter(letter) {
        if (this.disabledLetters.indexOf(letter) == -1) {
            let vowels = ['A', 'E', 'I', 'O', 'U'];
            if (vowels.indexOf(letter) !== -1) {
                this.vowelsGuessed++;
            }  
            else {
                this.consonantsGuessed++;
            }
            this.disabledLetters.push(letter);
            let arr = this.puzzleCheat.split('');
            let count = 0;
            let showAtIndex = [];
            arr.forEach(char => {
                if(char.toLocaleUpperCase() == letter) {
                    showAtIndex.push(count);
                }
                count++;
            });

            return (showAtIndex);
        }
        else {
            //This shouldnt really happen.
            this.disabledLetters.push(letter);
            console.log("This letter has already been chosen");
            return ([]);
        }
    }

    popLetter(index) {
        let arr1 = this.puzzle.split('');
        let arr2 = this.puzzleCheat.split('');
        arr1[index] = arr2[index];
        this.puzzle = arr1.join('')
    }

    //We should call this any time a player switches their ready status.
    allReady() {
        //Game has not started
        if (!this.hasStarted) {
            let temp = true;
            this.players.forEach(player => {
                //If a player isnt ready return false
                if (!player.ready) {
                    temp = false;
                }
            });
            if (temp) {
                //Everyone is ready, is there more than one player?
                if (this.numberOfPlayers > 1) {
                    return true;
                }
            }
            return false;
        }
    }

    getCurrentPlayerId() {
        return this.players[this.whosTurn].id;
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