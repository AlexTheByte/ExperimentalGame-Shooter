var hypoTrajectoire, hypoMax, coefLong, coefX, coefY;

var weaponX = player.x;
var weaponY = player.y;

var mouseX = mouseY = 0;

var bulletX = weaponX;
var bulletY = weaponY;
var bulletSize = 10;
var bulletSpeedX = bulletSpeedY = 0;
var bulletSpeedMax = 50;

var valeurMaxDuClick = 1000;


function weaponEventsInit() {
	//Events
    //Mouse movement
	canvas.onmousemove = mousemovement;	
    function mousemovement(event) {
		mouseX = event.clientX - canvas.offsetLeft;
		mouseY = event.clientY - canvas.offsetTop;
    }
    
    //Mouse up
    canvas.onmouseup = clickmouse;
    hypoMax = Math.abs((Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))) / 2);
    function clickmouse() {
    	//Bullet position at the weapon position
    	bulletX = weaponX;
		bulletY = weaponY;

		//Speed Coefs calculs
    	hypoTrajectoire = Math.sqrt(Math.pow(mouseX - weaponX, 2) + Math.pow(mouseY - weaponY, 2));
    	
    	coefLong = hypoMax / hypoTrajectoire;
    	
    	coefX = (mouseX - weaponX) / valeurMaxDuClick;
    	coefY = (mouseY - weaponY) / valeurMaxDuClick;
    	
    	//Speeds calculs
    	bulletSpeedX = bulletSpeedMax * coefX * coefLong;
    	bulletSpeedY = bulletSpeedMax * coefY * coefLong;
    	// alert("Positions " + (mouseX) + " " + (mouseY) + 
    		// "\nHypo : " + hypoTrajectoire + 
    		// "\nCoefs : " + coefX + " " + coefY + 
    		// "\nSpeed : " + bulletSpeedX + " " + bulletSpeedY);
    }
}

function weaponAction() {
    //Weapon position on the player
    weaponX = player.x + player.width / 2;
    weaponY = player.y + player.height / 4;
    //Bullet position calculs
    bulletX = bulletX + bulletSpeedX;
    bulletY = bulletY + bulletSpeedY;
    //Bullet draw begin
    context2D.beginPath();
    context2D.fillStyle = '#48C';
    context2D.arc(bulletX, bulletY, bulletSize, 0, 2 * Math.PI);
    //Trajectoire bullet draw
    context2D.moveTo(weaponX, weaponY);
    context2D.lineTo(mouseX, mouseY);
    //Bullet draw finishing
    context2D.fill(); 
    context2D.stroke(); 
    context2D.closePath();
}