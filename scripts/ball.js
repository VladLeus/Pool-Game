const ball_origin = new Vector(25,25)
const ball_diameter = 38
const ball_radius = ball_diameter / 2
const hole_radius = 46

function Ball(position, color){
    this.position = position
    this.velocity = new Vector()
    this.moving = false
    this.sprite = getBallsSpritesByCol(color)
    this.ballColor = color
    this.inHole = false
}

Ball.prototype.update = function (delta){
    this.position.addTo(this.velocity.mult(delta))

    this.velocity = this.velocity.mult(0.984)
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

Ball.prototype.collideWithBalls = function (ball){
    //find a normal vector

    const n = this.position.subtract(ball.position)

    //find distance
    const distance = n.calcLength()

    if (distance > ball_diameter){
        return
    }

    //find minimum translation distance

    const minimumTransDist = n.mult((ball_diameter - distance) / distance)

    //push/pull balls apart

    this.position = this.position.add(minimumTransDist.mult(1/2))
    ball.position = ball.position.subtract(minimumTransDist.mult(1/2))

    //find the unit normal vector

    const un = n.mult(1/n.calcLength())

    // find unit tangent vector
    const ut = new Vector(-un.y, un.x)

    //project velocities onto the unit normal and unit tangent vector

    const v1n = un.dot(this.velocity)
    const v1t = ut.dot(this.velocity)
    const v2n = un.dot(ball.velocity)
    const v2t = ut.dot(ball.velocity)

    //find new normal velocities

    let v1nTagged = v2n
    let v2nTagged = v1n

    //convert the scalar normal anf the tangential velocities into vectors
    v1nTagged = un.mult(v1nTagged)
    const v1tTagged = ut.mult(v1t)
    v2nTagged = un.mult(v2nTagged)
    const v2tTagged = ut.mult(v2t)

    //update velocities
    this.velocity = v1nTagged.add(v1tTagged)
    ball.velocity = v2nTagged.add(v2tTagged)

    this.moving = true
    ball.moving = true
}
Ball.prototype.collideWithTable = function (table){
    if (!this.moving){
        return
    }

    let collided = false

    if (this.position.y <= table.topBorderY + ball_radius){
        this.velocity = new Vector(this.velocity.x, -this.velocity.y)
        collided = true
    }
    if (this.position.x >= table.rightBorderX + ball_radius){
        this.velocity = new Vector(-this.velocity.x, this.velocity.y)
        collided = true
    }
    if (this.position.y >= table.bottomBorderY - ball_radius){
        this.velocity = new Vector(this.velocity.x, -this.velocity.y)
        collided = true
    }
    if (this.position.x <= table.leftBorderX + ball_radius){
        this.velocity = new Vector(-this.velocity.x, this.velocity.y)
        collided = true
    }

    if (collided){
        this.velocity = this.velocity.mult(0.984)
    }
}

Ball.prototype.collideWith = function (object) {
    if (object instanceof Ball){
        this.collideWithBalls(object)
    }
    else this.collideWithTable(object)
}
