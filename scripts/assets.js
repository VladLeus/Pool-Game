let sprites = {}
let assestStillLoading = 0;

function assetsLoagingCheck(callback){
    if(assestStillLoading){
        requestAnimationFrame(assetsLoagingCheck.bind(this, callback))
    }
    else {
        callback()
    }
}

function loading(callback){

    function loadSprite(file){
        assestStillLoading++

        let img = new Image();
        img.src = "./assets/sprites/" + file;

        img.onload = () => {
            assestStillLoading--
        }

        return img
    }

    sprites.background = loadSprite('spr_background.png')
    sprites.stick = loadSprite('spr_stick.png')
    sprites.whiteBall = loadSprite('spr_whiteBall.png')

    assetsLoagingCheck(callback)
}