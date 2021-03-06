var shortID = require('shortid');

module.exports = class Player {
    constructor() {
        //This comes from the login thingy
        this.username = 'No_Name';
        this.id = shortID.generate();
        this.robotColor = 'Red';
        this.robotAntenna = '01';
        this.robotBody = '01';
        this.cash = 0;
        this.totalCash = 0;
        this.ready = false;

        //This is the current game ID
        this.currentGame = "";

        //this might just be the ref to the player in the mongodb
        this.dbRef = "";

        this.reset = () => {
            this.currentGame = "";
            this.ready = false;
            this.cash = 0;
            this.totalCash = 0;
            this.dbRef = "";
        }
    }
}