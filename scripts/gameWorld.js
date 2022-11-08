const delta = 1/100

function GameWorld(){
    //Contains an every physical game objects and render it each frame
    this.whiteBall = new Ball(new Vector(413,413))
    this.stick = new Stick(new Vector(413,413), this.whiteBall.shoot.bind(this.whiteBall))

}
GameWorld.prototype.update = function ()  {
    this.stick.update()
    this.whiteBall.update(delta)
}

GameWorld.prototype.draw =  function ()  {

    canvas.drawImage(sprites.background, {x:0, y:0})

    this.stick.draw()
    this.whiteBall.draw()
}