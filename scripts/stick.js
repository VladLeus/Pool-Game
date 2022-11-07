function Stick(){
    this.position = new Vector(400,400)
    this.origin = new Vector(500,10)
}

Stick.prototype.update = function (){
    this.position = mouse.position

    if (mouse.left.pressed)
        console.log("nigga")
}

Stick.prototype.draw = function (){
    canvas.drawImage(sprites.stick, this.position,this.origin)
}