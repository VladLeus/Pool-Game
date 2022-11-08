const ball_origin = new Vector(25,25)

function Ball(position){
    this.position = position
    this.velocity = new Vector()
}

Ball.prototype.update = function (delta){
    this.position.addTo(this.velocity.mult(delta))

    this.velocity = this.velocity.mult(0.98)
}

Ball.prototype.draw = function (){
    canvas.drawImage(sprites.whiteBall, this.position, ball_origin)
}

Ball.prototype.shoot = function (power, rotation) {
    this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation))
}