function HandleMove(event){
    let x = event.pageX
    let y = event.pageY

    mouse.position = new Vector(x,y)
}

function HandleDown(event){
    HandleMove(event)

    //event.which where the value means which button on our mouse is pressed
    // if event.which equals 1 - left click, if equals 2 - middle button, if equals 3 - right click
    if (event.which === 1){
        if (!mouse.left.down){
            mouse.left.pressed = true
        }
        mouse.left.down = true
    }else if (event.which === 2){
        if (!mouse.middle.down){
            mouse.middle.pressed = true
        }
        mouse.middle.down = true
    }else if (event.which === 3){
        if (!mouse.right.down){
            mouse.right.pressed = true
        }
        mouse.right.down = true
    }
}

function HandleUp(event){
    HandleMove(event)

    if (event.which === 1){
        mouse.left.down = false
    }else if (event.which === 2){
        mouse.middle.down = false
    }else if (event.which === 3){
        mouse.right.down = false
    }
}

function MouseHandler(){
    this.left = new ButtonState()
    this.middle = new ButtonState()
    this.right = new ButtonState()

    this.position = new Vector()

    document.onmousemove = HandleMove
    document.onmousedown = HandleDown
    document.onmouseup = HandleUp
}
MouseHandler.prototype.reset = function (){
    this.left.pressed = false
    this.middle.pressed = false
    this.right.pressed = false
}

let mouse = new MouseHandler()
