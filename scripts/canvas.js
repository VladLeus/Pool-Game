function Canvas2D(){
    this.canvas = document.getElementById('screen');
    this.canvasContext = this.canvas.getContext('2d'); // 2d cuz we have a two-dimensional game
}

Canvas2D.prototype.clear = function ()  {
    this.canvasContext.clearRect(0,0, this.canvas.width, this.canvas.height);
}

Canvas2D.prototype.drawImage =  function (image, position, origin, rotation = 0)  {

    if  (!position){
        position = new Vector()
    }
    if (!origin){
        origin = new Vector()
    }
    this.canvasContext.save()
    this.canvasContext.translate(position.x, position.y)
    this.canvasContext.rotate(rotation)
    this.canvasContext.drawImage(image, -origin.x, -origin.y);
    this.canvasContext.restore()
}

let canvas = new Canvas2D();
