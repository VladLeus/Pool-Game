let currentPlayer = new Player(0, 1);
let secondPlayer =new Player(0, 2);
let ROUNDS = 1;
let currPlayerScoreTemp = currentPlayer.matchScore;

function Player(matchScore, playerNum){
    this.playerNum = playerNum
    this.playerHealth = 3;
    this.matchScore = matchScore;
    this.attempt = 5;
}