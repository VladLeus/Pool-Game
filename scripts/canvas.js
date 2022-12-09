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
    let canvasScale = this.canvas;

    position = typeof position !== 'undefined' ? position : Vector.zero;
    origin = typeof origin !== 'undefined' ? origin : Vector.zero;
    color = typeof color !== 'undefined' ? color : colors.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this.canvasContext.save();
    this.canvasContext.scale(canvasScale.x, canvasScale.y);
    this.canvasContext.translate(position.x - origin.x, position.y - origin.y);
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.font = fontsize + " " + fontname;
    this.canvasContext.fillStyle = color.toString();
    this.canvasContext.textAlign = textAlign;
    this.canvasContext.fillText(text, 0, 0);
    this.canvasContext.restore();
};

let canvas = new Canvas2D();
