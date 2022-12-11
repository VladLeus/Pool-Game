const stick_origin = new Vector(970,11)
const stick_shot_origin = new Vector(950,11)
const max_power = 5000


function Stick(position, onShoot){
    this.position = position
    this.rotation = 0
    this.origin = stick_origin.copy()
    this.power = 0
    this.onShoot = onShoot
    this.shot = false
    this.gamePolicy = new GamePolicy()

}

Stick.prototype.update = function (){
    if(mouse.left.down) {
        this.increasingPower()
    }
    else if (this.power > 0){
        this.shoot()
        currentPlayer.attempt--
        this.getWinnerByAttempts()
    }

    this.rotationUpdate()
}

Stick.prototype.draw = function (){
    canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation)
}

Stick.prototype.rotationUpdate = function (){
    let opposite = mouse.position.y - this.position.y
    let adjacent = mouse.position.x - this.position.x

    this.rotation = Math.atan2(opposite, adjacent)
}

Stick.prototype.increasingPower = function () {
    if (this.power > max_power){
        return
    }
    this.power += 140
    this.origin.x += 5
}

Stick.prototype.shoot = function () {
    this.onShoot(this.power, this.rotation)
    this.power = 0
    this.origin = stick_shot_origin.copy()
    this.shot = true
}

Stick.prototype.changeTheStickPosition = function (position) {
    this.position = position.copy()
    this.origin = stick_origin.copy()
    this.shot = false
}

Stick.prototype.getWinnerByAttempts = function () {
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
                this.gamePolicy.reset()
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
                this.gamePolicy.reset()
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
                this.gamePolicy.reset()
                poolGame.start()
            }, 2000)
        }
    }
}