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
        [new Vector(1126,354), colors.yellow],//7
        [new Vector(1126,393), colors.yellow],//8
        [new Vector(1126,433), colors.red],//9
        [new Vector(1126,472), colors.red],//10
        [new Vector(1162,335), colors.black],//11
        [new Vector(1162,374), colors.yellow],//12
        [new Vector(1162,413), colors.black],//13
        [new Vector(1162,452), colors.yellow],//14
        [new Vector(1162,491), colors.red],//15
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
            setTimeout(this.spawnBalls.splice(i,1), 1000);
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
        this.stick.changeTheStickPosition(this.whiteBall.position)
    }
}

GameWorld.prototype.draw =  function ()  {

    canvas.drawImage(sprites.background, {x:0, y:0})

    for (let i = 0; i < this.spawnBalls.length; i++){
        this.spawnBalls[i].draw()
    }
    this.stick.draw()
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