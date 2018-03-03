//position and size player
var player = new Rectangle(100, (CANVASHEIGHT - 80), 35, 80);

//commands
var commands = {
    LEFT : 'Left',
    RIGHT : 'Right',
    JUMP : 'Jump',
    DOUBLEJUMP : 'DoubleJump',
    FIRE : 'Fire',
    NONE : 'None'
};
//body movement
var zWalkCommand = commands.NONE;
var zJumpCommand = commands.NONE;
var zzJumpCommand = commands.NONE;
var playerXSpeed = 0;
var playerYSpeed = 0;
var accLeft = false;
var accRight = false;
var gravity = 0;
//arm movement
var armAngle = 0;
var armXOnBody = -player.width / 4;
var armYOnBody = -player.height / 2;
var armWidth = player.width / 2;
var armHeight = player.height / 2;
var armX, armY, Xb, Yb, Xa;


function playerEventsInit() {
    //On key down
    //z:90, q:81, s:83, d:68, space:32
    document.onkeydown = keyDown; 
    function keyDown(event) {
        if(event.keyCode == 68) { //d
            accRight = true;
        } else if (event.keyCode === 81) { //q
            accLeft = true;
        } else if (event.keyCode === 32) { //space
        	if((zJumpCommand != commands.JUMP && zJumpCommand != commands.DOUBLEJUMP) 
        	|| (zJumpCommand == commands.JUMP && zJumpCommand != commands.DOUBLEJUMP)) {
        		playerYSpeed = -4;
            	gravity = 0.1;
        	}
        	if(zJumpCommand != commands.JUMP && zJumpCommand != commands.DOUBLEJUMP) {
            	zJumpCommand = commands.JUMP;
        	} else if (zJumpCommand == commands.JUMP && zJumpCommand != commands.DOUBLEJUMP) {
            	zJumpCommand = commands.DOUBLEJUMP;
        	}
        }
    }
	//On key up
    document.onkeyup = keyUp; 
    function keyUp(event) {
        if(event.keyCode === 68) {
            accRight = false;
        } else if(event.keyCode === 81) {
            accLeft = false;
        } 
    }
}

function playerAction() {
	//BODY MOVEMENT
	//Left and Right
	if (accLeft && accRight) { //Don't move if left and right pushed at the same times
		zWalkCommand = commands.NONE;
		playerXSpeed = 0;
	} else if(accLeft) { //Left
		zWalkCommand = commands.LEFT;
		if(playerXSpeed > -3) {
			playerXSpeed = playerXSpeed - 0.2;
		}
	} else if(accRight) { //Right
		zWalkCommand = commands.RIGHT;
		if(playerXSpeed < 3) {
			playerXSpeed = playerXSpeed + 0.2;
		}
	} else { //Else dcc
		if(zWalkCommand === commands.RIGHT && playerXSpeed > 0) {
			playerXSpeed = playerXSpeed - 0.5;
		} else if (zWalkCommand === commands.LEFT && playerXSpeed < 0) {
			playerXSpeed = playerXSpeed + 0.5;
		} else {
			playerXSpeed = 0;
		}
		
	}
	//Position X calcul
	player.x = player.x + playerXSpeed;
	//Jump
	if(gravity != 0) { //Jump gestion
		if(floorAABBCollision(player)) {
			player.y = canvas.height - player.height;
			playerYSpeed = 0;
			gravity = 0;
			zJumpCommand = commands.NONE;
		} else {
			playerYSpeed = playerYSpeed + gravity;
		}
	} 
	//Position Y calcul
	player.y = player.y + playerYSpeed;
	//Body drawing
	context2D.beginPath();
	context2D.fillStyle = '#EA1';
	context2D.rect(player.x, player.y, player.width, player.height);
	context2D.fill(); 
    context2D.stroke(); 
	context2D.closePath();

	//ARM MOVEMENT
	armX = player.x + player.width / 2;
	armY = player.y + player.height / 4;
	//Angle calculs
	Xb = mouseX - armX;
	Yb = - (mouseY - armY);
	Xa = Xb;
	armAngle = Math.acos((Xa * Xb) / (Xa * Math.sqrt(Math.pow(Xb, 2) + Math.pow(Yb, 2))));
	//Arm rotation
	context2D.save();
	context2D.translate(armX, armY);
	if(Yb < 0) {
		context2D.rotate(armAngle + Math.PI/2);
	} else {
		context2D.rotate(-armAngle + Math.PI/2);
	}
	//Arm drawing begin
	context2D.beginPath();
	context2D.rect(armXOnBody, armYOnBody, armWidth, armHeight);
	context2D.restore();
	context2D.fillStyle = '#E01';
	//Arm draw finishing
	context2D.fill(); 
    context2D.stroke(); 
	context2D.closePath();
}