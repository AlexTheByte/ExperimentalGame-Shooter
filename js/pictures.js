//Background
//var background = new Image();
//background.src = 'images/background_test.png';
//background.isAvailable = false;
//background.onload = function() {
//    background.isAvailable = true;
//};
//
//background.draw = function() {
//    if(background) {
//        context2D.drawImage(background, 0, 0, CANVASWIDTH, CANVASHEIGHT);
//    }
//    
//
//}

function Picture(context, pictureLink, x, y, width, height) {
    var isAvailable = false;
    var context = context;
    var picture = new Image();
    picture.src = pictureLink;
    
    
    console.log(picture.src +" "+ isAvailable +" "+ context);
    
    picture.onload = function() {
        var isAvailable = true;
        console.log("good");
    };
    
    var draw = function() {
        console.log(isAvailable);
        if(isAvailable) {
            console.log("passe par là");
            context.drawImage(picture, 0, 0, CANVASWIDTH, CANVASHEIGHT);
        }
    };
}

