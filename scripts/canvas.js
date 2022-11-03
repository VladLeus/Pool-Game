function Canvas2D(){
    this.canvas = document.getElementById('screen');
    this.canvasContext = this.canvas.getContext('2d'); // 2d cuz we have a two-dimensional game
}

Canvas2D.prototype.clear = () => {
    this.canvasContext.clearRect(0,0, this._canvas.width, this.canvas.height);
}

Canvas2D.prototype.drawImage = (image, position) => {
    this.canvasContext.drawImage(image, position.x, position.y);
}

let canvas = new Canvas2D();
