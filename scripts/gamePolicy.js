function GamePolicy(){

    this.turn = 0;
    this.firstCollision = true;
    let player1TotalScore = new Score(new Vector(Game.size.x/2 - 75,Game.size.y/2 - 45));
    let player2TotalScore = new Score(new Vector(Game.size.x/2 + 75,Game.size.y/2 - 45));

    let player1MatchScore = new Score(new Vector(Game.size.x/2 - 280,108));
    let player2MatchScore = new Score(new Vector(Game.size.x/2 + 230,108));

    this.players = [new Player(player1MatchScore,player1TotalScore), new Player(player2MatchScore,player2TotalScore)];
    this.foul = false;
    this.scored = false;
    this.allBallsinHoles = false;
    this.won = false;
    this.turnPlayed = false;
    this.validBallsInsertedOnTurn = 0;

    this.leftBorderX = 70;
    this.rightBorderX = 1400;
    this.topBorderY = 50;
    this.bottomBorderY = 760;

    this.topCenterHolePos = new Vector(750,32);
    this.bottomCenterHolePos = new Vector(750,794);
    this.topLeftHolePos = new Vector(62,62);
    this.topRightHolePos = new Vector(1435,62);
    this.bottomLeftHolePos = new Vector(62,762)
    this.bottomRightHolePos = new Vector(1435,762);
}

GamePolicy.prototype.reset = function(){
    this.turn = 0;
    this.players[0].matchScore.value = 0;
    this.players[0].playerColor = undefined;
    this.players[0].playerHealth = 3;
    this.players[1].matchScore.value = 0;
    this.players[1].playerColor = undefined;
    this.players[1].playerHealth = 3;
    this.foul = false;
    this.scored = false;
    this.turnPlayed = false;
    this.won = false;
    this.firstCollision = true;
    this.validBallsInsertedOnTurn = 0;
}

GamePolicy.prototype.drawScores = function(){
    canvas.drawText("PLAYER " + (this.turn+1), new Vector(Game.size.x/2 + 40,200), new Vector(150,0), "#096834", "top", "Impact", "70px");
    this.players[0].totalScore.draw();
    this.players[1].totalScore.draw();

    this.players[0].matchScore.drawLines(this.players[0].color);
    this.players[1].matchScore.drawLines(this.players[1].color);
}

GamePolicy.prototype.isInsideTopLeftHole = function(pos){
    if (this.topLeftHolePos.distanceFrom(pos) < hole_radius) {
        return true
    }
    else {
        return false
    }
}

GamePolicy.prototype.isInsideTopRightHole = function(pos){
    if (this.topRightHolePos.distanceFrom(pos) < hole_radius) {
        return true
    }
    else {
        return false
    }
}

GamePolicy.prototype.isInsideBottomLeftHole = function(pos){
    if (this.bottomLeftHolePos.distanceFrom(pos) < hole_radius) {
        return true
    }
    else {
        return false
    }
}

GamePolicy.prototype.isInsideBottomRightHole = function(pos){
    if (this.bottomRightHolePos.distanceFrom(pos) < hole_radius) {
        return true
    }
    else {
        return false
    }
}

GamePolicy.prototype.isInsideTopCenterHole = function(pos){
    if (this.topCenterHolePos.distanceFrom(pos) < hole_radius) {
        return true
    }
    else {
        return false
    }
}

GamePolicy.prototype.isInsideBottomCenterHole = function(pos){
    if (this.bottomCenterHolePos.distanceFrom(pos) < hole_radius) {
        return true
    }
    else {
        return false
    }
}

GamePolicy.prototype.isInsideHole = function(pos){
    if (this.isInsideTopLeftHole(pos) || this.isInsideTopRightHole(pos) ||
        this.isInsideBottomLeftHole(pos) || this.isInsideBottomRightHole(pos) ||
        this.isInsideTopCenterHole(pos) || this.isInsideBottomCenterHole(pos)) {
        return true
    } else {
        return false
    }
}

GamePolicy.prototype.initiateState = function(policyState){

    this.turn = policyState.turn;
    this.firstCollision = policyState.firstCollision;
    this.foul = policyState.foul;
    this.scored = policyState.scored;
    this.won = policyState.won;
    this.turnPlayed = policyState.turnPlayed;
    this.validBallsInsertedOnTurn = policyState.validBallsInsertedOnTurn;

    this.players[0].totalScore.value = policyState.players[0].totalScore.value;
    this.players[1].totalScore.value = policyState.players[1].totalScore.value;

    this.players[0].matchScore.value = policyState.players[0].matchScore.value;
    this.players[0].playerColor = policyState.players[0].color;
    this.players[0].playerHealth = policyState.players[0].playerHealth;
    this.players[1].matchScore.value = policyState.players[1].matchScore.value;
    this.players[1].playerHealth = policyState.players[1].playerHealth;
    this.players[1].playerColor = policyState.players[1].color;
}

GamePolicy.prototype.handleBallInHole = function(ball){

    let currentPlayer = this.players[this.turn];
    let secondPlayer = this.players[(this.turn + 1) % 2];

    if (this.allBallsinHoles === false) {
        if (this.isInsideHole()) {

            if (currentPlayer.playerColor === undefined) {
                if (ball.color === colors.red) {
                    currentPlayer.playerColor = colors.red;
                    secondPlayer.color = colors.yellow;
                } else if (ball.color === colors.yellow) {
                    currentPlayer.playerColor = colors.yellow;
                    secondPlayer.color = colors.red;
                } else if (ball.color === colors.black) {
                    currentPlayer.playerColor = colors.black;
                } else if (ball.color === colors.white) {
                    this.foul = true;
                    currentPlayer.playerHealth--;
                    return;
                }
            }

            if (currentPlayer.playerColor === ball.color) {
                currentPlayer.matchScore.increment();
                this.scored = true;
                this.validBallsInsertedOnTurn++;
            }
        }
    } else if (currentPlayer.matchScore === 15 || secondPlayer.matchScore === 15 || currentPlayer.matchScore + secondPlayer.matchScore === 15) {
        this.won = true;
    }


}