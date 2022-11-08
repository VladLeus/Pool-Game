function Vector(x = 0,y = 0){
    this.x = x
    this.y = y
}

Vector.prototype.copy = function () {
    return new Vector(this.x, this.y)
}

Vector.prototype.add = function (vector){
    return new Vector(this.x + vector.x, this.y + vector.y)

}

Vector.prototype.addTo = function (vector){
    this.x += vector.x
    this.y += vector.y
}

Vector.prototype.subtract = function (vector){
    return new Vector(this.x - vector.x, this.y - vector.y)
}

Vector.prototype.mult = function (scale) {
    return new Vector(this.x * scale, this.y * scale)
}

Vector.prototype.dot = function (vector){
    return this.x * vector.x + this.y * vector.y
}

Vector.prototype.calcLength = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
}