var canvas;
var CANVASWIDTH = 1100;
var CANVASHEIGHT = 700;
var context2D;
var requestAnimId;

var background;


/*function initAllScripts(){
    var scriptsName = 'js/pictures.js';
    var script = document.createElement('script');
    script.src = (scriptsName);
    document.getElementsByTagName('head')[0].appendChild(script);
}
initAllScripts();
*/

var initialisation = function() {
	//Canvas initialisation
	canvas = document.getElementById('myCanvas');
	canvas.width = CANVASWIDTH;
	canvas.height = CANVASHEIGHT;

	//Context initialisation
	context2D = document.getElementById('myCanvas').getContext('2d');
    
	//Event initialisation
	playerEventsInit();
	weaponEventsInit();
    
    background = new Picture(context2D, 'images/background_test.png', 0, 0, CANVASWIDTH, CANVASHEIGHT);
    
    
	//Principal function activation
	requestAnimId = window.requestAnimationFrame(principale); // premier appel de principale au rafraichissement de la page
};



var principale = function() {
	context2D.clearRect(0, 0, canvas.width, canvas.height);
	
    background.draw;
    //Elements actions
	weaponAction();
	playerAction();
    
	requestAnimId = window.requestAnimationFrame(principale); // rappel de principale au prochain rafraichissement de la page
};


window.onload = initialisation; // appel de la fonction initialisation au chargement de la page


//setInterval(function(){ alert("Hello"); }, 3000);