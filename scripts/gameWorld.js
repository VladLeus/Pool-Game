const delta = 1/177

function GameWorld(){
    //Contains an every physical game objects and render it each frame
    this.spawnBalls = [
        [new Vector(1022,413), colors.red],//1
        [new Vector(1056,399), colors.yellow],//2
        [new Vector(1056,433), colors.yellow],//3
        [new Vector(1090,374), colors.black],//4
        [new Vector(1090,413), colors.red],//5
        [new Vector(1090,452), colors.black],//6
        [new Vector(413,413), colors.white]
    ].map(params => new Ball(params[0], params[1]))

    this.whiteBall = this.spawnBalls[this.spawnBalls.length - 1]
    this.stick = new Stick(new Vector(413,413), this.whiteBall.shoot.bind(this.whiteBall))
    this.policy = new GamePolicy()

    this.gameTable = {
        topBorderY: 50,
        rightBorderX: 1400,
        bottomBorderY: 760,
        leftBorderX: 70
    }
}


GameWorld.prototype.handleTheCollisions = function () {

    for (let i = 0; i < this.spawnBalls.length; i++){
        this.spawnBalls[i].collideWith(this.gameTable)
        if (this.policy.handleBallInHole(this.spawnBalls[i])) {
            this.spawnBalls.splice(i,1)
        }
        for (let j = i + 1; j < this.spawnBalls.length; j++){
            let firstBall = this.spawnBalls[i]
            let secBall = this.spawnBalls[j]
            firstBall.collideWith(secBall)
        }
    }
}

GameWorld.prototype.update = function ()  {

    this.handleTheCollisions()


    this.stick.update()


    for (let i = 0; i < this.spawnBalls.length; i++){
        this.spawnBalls[i].update(delta)
    }

    if (!this.isBallsMoves() && this.stick.shot){
        this.checkForSwitch()
        this.policy.getWinner()
        this.stick.changeTheStickPosition(this.whiteBall.position)
    }
}

GameWorld.prototype.draw =  function ()  {

    canvas.drawImage(sprites.background, {x:0, y:0})

    for (let i = 0; i < this.spawnBalls.length; i++){
        this.spawnBalls[i].draw()
    }
    this.stick.draw()

    canvas.canvasContext.fillStyle = "#FFF"
    canvas.canvasContext.font = "14px serif"
    let message = `Player №${currentPlayer.playerNum}, Your Score: ${currentPlayer.matchScore}, Your Health: ${currentPlayer.playerHealth}, Your attempts: ${currentPlayer.attempt}, Round: ${ROUNDS} `
    canvas.canvasContext.fillText(message, 200, 20);
}

GameWorld.prototype.isBallsMoves = function (){
    let ballsMoving = false
    for (let i = 0; i < this.spawnBalls.length; i++){
        if (this.spawnBalls[i].moving){
            ballsMoving = true
            break
        }
    }
    return ballsMoving
}

GameWorld.prototype.checkForSwitch = function (){
    if (currentPlayer.attempt === 0 && secondPlayer.attempt !== 0){
        this.policy.switchTurns()
    } else if (currentPlayer.matchScore === currPlayerScoreTemp && secondPlayer.attempt !== 0) {
        this.policy.switchTurns()
        currPlayerScoreTemp = currentPlayer.matchScore;
    } else if (currentPlayer.matchScore > currPlayerScoreTemp) {
        currPlayerScoreTemp = currentPlayer.matchScore
    } else if (currentPlayer.attempt === 0 && secondPlayer.attempt !== 0){
        this.policy.switchTurns()
    }

}