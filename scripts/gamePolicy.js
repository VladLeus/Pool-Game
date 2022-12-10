function GamePolicy(){

    this.players = [new Player(0, 1), new Player(0, 2)];
    this.scored = true;
    this.leftBorderX = 70;
    this.rightBorderX = 1400;
    this.topBorderY = 50;
    this.bottomBorderY = 760;

    this.topCenterHolePos = new Vector(750,32);
    this.bottomCenterHolePos = new Vector(750,785);
    this.topLeftHolePos = new Vector(62,62);
    this.topRightHolePos = new Vector(1435,62);
    this.bottomLeftHolePos = new Vector(62,762)
    this.bottomRightHolePos = new Vector(1435,762);

    this.currentPlayer = this.players[0];
    this.secondPlayer = this.players[1];
}

/*GamePolicy.prototype.reset = function() {
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
}*/

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

GamePolicy.prototype.handleBallInHole = function (ball) {

    if (this.isInsideHole(ball.position)) {
        switch (ball.ballColor) {
            case 1:
                this.currentPlayer.matchScore++
                this.getWinner()
                break;
            case 2:
                this.currentPlayer.matchScore++
                this.getWinner()
                break;
            case 3:
                this.currentPlayer.matchScore++
                this.getWinner()
                break
            case 4:
                this.scored = false;
                break
            default:
                break;
        }
        if (!this.scored){
            if(!mouse.left.down){
                ball.position = mouse.position
                ball.velocity = new Vector()
            }
            this.currentPlayer.playerHealth--;
            this.getWinner()
            this.scored = true;
            return false;
        }
        return true;
    }
}

GamePolicy.prototype.getWinner = function () {
    if (this.currentPlayer.playerHealth === 0){
        swal({
            title: "Game ended",
            text: `Player ${this.currentPlayer.playerNum} lost all his hearts. Press Esc to restart`,
            icon: "error",
            button: null
        });
        setTimeout(() =>{
            poolGame.start()
        }, 2000)
    } else if (this.secondPlayer.playerHealth === 0) {
        swal({
            title: "Game ended",
            text: `Player ${this.secondPlayer.playerNum} lost all his hearts. Press Esc to restart`,
            icon: "error",
            button: null
        });
        setTimeout(() =>{
            poolGame.start()
        }, 2000)
    }
    if (this.currentPlayer.matchScore === 6 || this.secondPlayer.matchScore === 6 || this.currentPlayer.matchScore + this.secondPlayer.matchScore === 6){
        if (this.currentPlayer.matchScore > this.secondPlayer.matchScore){
            swal({
                title: "Game ended",
                text: `Player ${this.currentPlayer.playerNum} won the game! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                poolGame.start()
            }, 2000)
        } else {
            swal({
                title: "Game ended",
                text: `Player ${this.secondPlayer.playerNum} won the game! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                poolGame.start()
            }, 2000)
        }
    }
}