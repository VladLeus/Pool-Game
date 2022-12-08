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

Canvas2D.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};

let canvas = new Canvas2D();
