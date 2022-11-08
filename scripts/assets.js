let sprites = {}
let assetsStillLoading = 0;

function assetsLoadingCheck(callback){
    if(assetsStillLoading){
        requestAnimationFrame(assetsLoadingCheck.bind(this, callback))
    }
    else {
        callback()
    }
}

function loading(callback){

    function loadSprite(file){
        assetsStillLoading++

        let img = new Image();
        img.src = "./assets/sprites/" + file;

        img.onload = () => {
            assetsStillLoading--
        }

        return img
    }

    sprites.background = loadSprite('spr_background.png')
    sprites.stick = loadSprite('spr_stick.png')
    sprites.whiteBall = loadSprite('spr_whiteBall.png')
    sprites.redBall = loadSprite('spr_redBall.png')
    sprites.yellowBall = loadSprite('spr_yellowBall.png')
    sprites.blackBall = loadSprite('spr_blackBall.png')

    assetsLoadingCheck(callback)
}

function getBallsSpritesByCol(color){
    switch (color){
        case colors.red:
            return sprites.redBall
        case colors.yellow:
            return sprites.yellowBall
        case colors.black:
            return sprites.blackBall
        case colors.white:
            return sprites.whiteBall
    }
}