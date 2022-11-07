function GameWorld(){
    //Contains an every physical game objects and render it each frame
    this.stick = new Stick()

}
GameWorld.prototype.update = function ()  {
    this.stick.update()
}

GameWorld.prototype.draw =  function ()  {

    canvas.drawImage(sprites.background, {x:0, y:0})

    this.stick.draw()
}