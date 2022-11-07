function Game(){

}

Game.prototype.init = function ()  {
    //Here we initialize the game

    this._gameWorld = new GameWorld()
}

Game.prototype.start = function () {
    //Here we start the game

    poolGame.init()

    poolGame.main()
}

Game.prototype.main = function ()  {

    canvas.clear()
    poolGame._gameWorld.update()
    poolGame._gameWorld.draw()
    mouse.reset()

    requestAnimationFrame(poolGame.main)

}

let poolGame = new Game()