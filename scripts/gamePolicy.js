function GamePolicy(){

    this.turn = 0;
    this.firstCollision = true;

    let player1MatchScore = new Score(new Vector(150,150));
    let player2MatchScore = new Score(new Vector(1150,150));

    this.players = [new Player(player1MatchScore), new Player(player2MatchScore)];
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
    this.players[0].playerHealth = 3;
    this.players[1].matchScore.value = 0;
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

    this.players[0].matchScore.drawLines(this.players[0].color);
    this.players[1].matchScore.drawLines(this.players[1].color);
}

GamePolicy.prototype.isInsideTopLeftHole = function(pos){
    return this.topLeftHolePos.distanceFrom(pos) < hole_radius;
}

GamePolicy.prototype.isInsideTopRightHole = function(pos){
    return this.topRightHolePos.distanceFrom(pos) < hole_radius;
}

GamePolicy.prototype.isInsideBottomLeftHole = function(pos){
    return this.bottomLeftHolePos.distanceFrom(pos) < hole_radius;
}

GamePolicy.prototype.isInsideBottomRightHole = function(pos){
    return this.bottomRightHolePos.distanceFrom(pos) < hole_radius;
}

GamePolicy.prototype.isInsideTopCenterHole = function(pos){
    return this.topCenterHolePos.distanceFrom(pos) < hole_radius;
}

GamePolicy.prototype.isInsideBottomCenterHole = function(pos){
    return this.bottomCenterHolePos.distanceFrom(pos) < hole_radius;
}

GamePolicy.prototype.isInsideHole = function(pos){
    return this.isInsideTopLeftHole(pos) || this.isInsideTopRightHole(pos) ||
        this.isInsideBottomLeftHole(pos) || this.isInsideBottomRightHole(pos) ||
        this.isInsideTopCenterHole(pos) || this.isInsideBottomCenterHole(pos);
}

GamePolicy.prototype.initiateState = function(policyState){

    this.turn = policyState.turn;
    this.firstCollision = policyState.firstCollision;
    this.foul = policyState.foul;
    this.scored = policyState.scored;
    this.won = policyState.won;
    this.turnPlayed = policyState.turnPlayed;
    this.validBallsInsertedOnTurn = policyState.validBallsInsertedOnTurn;

    this.players[0].matchScore.value = policyState.players[0].matchScore.value;
    this.players[0].playerHealth = policyState.players[0].playerHealth;
    this.players[1].matchScore.value = policyState.players[1].matchScore.value;
    this.players[1].playerHealth = policyState.players[1].playerHealth;
}

GamePolicy.prototype.handleBallInHole = function(ball){

    let currentPlayer = this.players[this.turn];
    let secondPlayer = this.players[(this.turn + 1) % 2];


    if (this.isInsideHole(ball.position)) {

        switch (ball.color) {
            case colors.red:
                currentPlayer.matchScore++
                this.scored = true
                break;
            case colors.yellow:
                currentPlayer.matchScore++
                this.scored = true
                break;
            case colors.black:
                currentPlayer.matchScore++
                this.scored = true
                break
            case colors.white:
                this.foul = true;
                currentPlayer.playerHealth--
                break;
            default:
                break;
        }
        return true;
    }
}