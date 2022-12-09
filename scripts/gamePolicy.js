function GamePolicy(){


    let player1MatchScore = new Score(new Vector(150,150));
    let player2MatchScore = new Score(new Vector(1150,150));

    this.players = [new Player(player1MatchScore, 1), new Player(player2MatchScore, 2)];
    this.scored = false;
    this.allBallsinHoles = false;

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

    this.currentPlayer = this.players[0];
    this.secondPlayer = this.players[1];
}

GamePolicy.prototype.reset = function() {
    this.players[0].matchScore.value = 0;
    this.players[0].playerHealth = 3;
    this.players[0].attempt--;
    if (this.players[0].attempt < 3){
        this.players[0].attempt = 5
    }
    this.players[1].matchScore.value = 0;
    this.players[1].playerHealth = 3;
    this.players[1].attempt--;
    if (this.players[1].attempt < 3){
        this.players[1].attempt = 5
    }
    this.scored = false;
}

GamePolicy.prototype.drawScores = function(){
    canvas.drawText("PLAYER " + (this.currentPlayer.playerNum.toString()), new Vector(800,300), new Vector(150,0), "#096834", "top", "Impact", "70px");

    this.players[0].matchScore.drawLines(this.players[0].playerNum);
    this.players[1].matchScore.drawLines(this.players[1].playerNum);
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

GamePolicy.prototype.handleBallInHole = function(ball){


    if (this.isInsideHole(ball.position)) {
        switch (ball.ballColor) {
            case 1:
                this.currentPlayer.matchScore++
                this.scored = true
                break;
            case 2:
                this.currentPlayer.matchScore++
                this.scored = true
                break;
            case 3:
                this.currentPlayer.matchScore++
                this.scored = true
                break
            case 4:
                this.currentPlayer.playerHealth--
                console.log(this.currentPlayer.playerHealth)
                /*this.getWinner(this.currentPlayer, this.secondPlayer)*/
                return false;
            default:
                break;
        }
        return true;
    }
}

GamePolicy.prototype.getWinner = function (currentPlayer, secondPLayer) {
    if (this.currentPlayer.playerHealth === 0){
        alert(`Player ${this.currentPlayer.playerNum} lost all his hearts`)
        this.reset()
    } else if (this.secondPlayer.playerHealth === 0) {
        alert(`Player ${this.secondPlayer.playerNum} lost all his hearts`)
        this.reset()
    }
    if (this.currentPlayer.matchScore === 15 || this.secondPlayer.matchScore === 15 || this.currentPlayer.matchScore + this.secondPlayer.matchScore === 15){
        if (this.currentPlayer.matchScore > this.secondPlayer.matchScore){
            alert(`Player ${this.currentPlayer.playerNum} won the game!`)
            this.reset()
        } else {
            alert(`Player ${this.secondPlayer.playerNum} won the game`)
            this.reset()
        }
    }
}