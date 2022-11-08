const stick_origin = new Vector(970,11)
const stick_shot_origin = new Vector(950,11)


function Stick(position, onShoot){
    this.position = position
    this.rotation = 0
    this.origin = stick_origin.copy()
    this.power = 0
    this.onShoot = onShoot

}

Stick.prototype.update = function (){
    if(mouse.left.down) {
        this.increasingPower()
    }
    else if (this.power > 0){
        this.shoot()
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
    this.power += 100
    this.origin.x += 5
}

Stick.prototype.shoot = function () {
    this.onShoot(this.power, this.rotation)
    this.power = 0
    this.origin = stick_shot_origin.copy()
}