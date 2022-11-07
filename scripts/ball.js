const ball_origin = new Vector(25,25)

function Ball(position){
    this.position = position
}

Ball.prototype.update = function (){

}

Ball.prototype.draw = function (){
    canvas.drawImage(sprites.whiteBall, this.position, ball_origin)
}