const ball_origin = new Vector(25,25)
const ball_diameter = 38;

function Ball(position, color){
    this.position = position
    this.velocity = new Vector()
    this.moving = false
    this.sprite = getBallsSpritesByCol(color)
}

Ball.prototype.update = function (delta){
    this.position.addTo(this.velocity.mult(delta))

    this.velocity = this.velocity.mult(0.98)
    if (this.velocity.calcLength() < 5){
        this.velocity = new Vector()
        this.moving = false
    }
}

Ball.prototype.draw = function (){
    canvas.drawImage(this.sprite, this.position, ball_origin)
}

Ball.prototype.shoot = function (power, rotation) {
    this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation))
    this.moving = true
}

Ball.prototype.collideWith = function (ball) {
    //find a normal vector

    let n = this.position.subtract(ball.position)

    //find distance
    let distance = n.length

    if (distance > ball_diameter){
        return
    }

    //find the unit normal vector

    let un = n.mult(1/n.length)

    // find unit tangent vector

    let ut = new Vector(-un.y, un.x)

    //project velocities onto the unit normal and unit tangent vector

    let v1n = un.dot(this.velocity)
    let v1t = ut.dot(this.velocity)
    let v2n = un.dot(ball.velocity)
    let v2t = ut.dot(ball.velocity)

    //find new normal velocities

    let v1nTagged = v2n
    let v2nTagged = v1n

    //convert the scalar normal anf the tangential velocities into vectors
    v1nTagged = un.mult(v1nTagged)
    let v1tTagged = ut.mult(v1t)
    v2nTagged = un.mult(v2nTagged)
    let v2tTagged = ut.mult(v2t)

    //update velocities
    this.velocity = v1nTagged.add(v1tTagged)
    ball.velocity = v2nTagged.add(v2tTagged)

    this.moving = true
    ball.moving = true
}