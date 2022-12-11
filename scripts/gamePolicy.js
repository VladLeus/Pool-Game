function GamePolicy(){

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

}

GamePolicy.prototype.reset = function() {
    currentPlayer.playerNum = 1;
    currentPlayer.playerHealth = 3;
    currentPlayer.matchScore = 0;
    currentPlayer.attempt = 5 - (ROUNDS - 1);
    if (currentPlayer.attempt < 3 ){
        ROUNDS = 1;
        currentPlayer.attempt = 5;
    }

    secondPlayer.playerNum = 2;
    secondPlayer.playerHealth = 3;
    secondPlayer.matchScore = 0;
    secondPlayer.attempt = 5 - ROUNDS;
    if (secondPlayer.attempt < 3 ){
        ROUNDS = 0;
        secondPlayer.attempt = 5;
    }
}

GamePolicy.prototype.switchTurns = function () {
    let temp = currentPlayer;
    currentPlayer = secondPlayer;
    secondPlayer = temp;
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

GamePolicy.prototype.handleBallInHole = function (ball) {

    if (this.isInsideHole(ball.position)) {
        switch (ball.ballColor) {
            case 1:
                currentPlayer.matchScore++
                break;
            case 2:
                currentPlayer.matchScore++
                break;
            case 3:
                currentPlayer.matchScore++
                break
            case 4:
                this.scored = false;
                break
            default:
                break;
        }
        if (!this.scored) {
            ball.position = new Vector(413, 413)
            ball.velocity = new Vector()
            currentPlayer.playerHealth--;
            this.scored = true;
            return false;
        }
        return true;
    }
}

GamePolicy.prototype.getWinner = function () {
    if (currentPlayer.playerHealth === 0){
        swal({
            title: "Game ended",
            text: `Player ${currentPlayer.playerNum} lost all his hearts. Press Esc to restart`,
            icon: "error",
            button: null
        });
        setTimeout(() =>{
            ROUNDS++
            this.reset()
            poolGame.start()
        }, 2000)
    } else if (secondPlayer.playerHealth === 0) {
        swal({
            title: "Game ended",
            text: `Player ${secondPlayer.playerNum} lost all his hearts. Press Esc to restart`,
            icon: "error",
            button: null
        });
        setTimeout(() =>{
            ROUNDS++
            this.reset()
            poolGame.start()
        }, 2000)
    }

    if (currentPlayer.attempt === 0 && secondPlayer.attempt === 0){
        if (currentPlayer.matchScore > secondPlayer.matchScore){
            swal({
                title: "Game ended",
                text: `Player ${currentPlayer.playerNum} won the game! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                ROUNDS++
                this.reset()
                poolGame.start()
            }, 2000)
        } else if (currentPlayer.matchScore < secondPlayer.matchScore) {
            swal({
                title: "Game ended",
                text: `Player ${secondPlayer.playerNum} won the game! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                ROUNDS++
                this.reset()
                poolGame.start()
            }, 2000)
        } else {
            swal({
                title: "Game ended",
                text: `DRAW! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                ROUNDS++
                this.reset()
                poolGame.start()
            }, 2000)
        }
    }

    if (currentPlayer.matchScore === 6 || secondPlayer.matchScore === 6 || currentPlayer.matchScore + secondPlayer.matchScore === 6){
        if (currentPlayer.matchScore > secondPlayer.matchScore){
            swal({
                title: "Game ended",
                text: `Player ${currentPlayer.playerNum} won the game! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                ROUNDS++
                this.reset()
                poolGame.start()
            }, 2000)
        } else {
            swal({
                title: "Game ended",
                text: `Player ${secondPlayer.playerNum} won the game! Press Esc to restart`,
                icon: "success",
                button: null
            });
            setTimeout(() =>{
                ROUNDS++
                this.reset()
                poolGame.start()
            }, 2000)
        }
    }
}