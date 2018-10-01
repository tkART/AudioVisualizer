var song;
var amp;
var button;


var scl = 32;
var xSize = 512;
var ySize = 1024;

var z = [];
var volhistory = [];

function toggleSong() {  if (song.isPlaying()) {	song.pause();	} else {	song.play();	}	}
function preload() {  song = loadSound('Piano.mp3');	}

function setup() {
	createCanvas(xSize*3.5, ySize, WEBGL);
  cols = Math.pow(2, Math.round(Math.log(xSize)/Math.log(2)))/scl;
  rows = ySize/scl;

  for (var x = 0; x < cols; x++) {
    z[x] = [];
    for (var y = 0; y < rows; y++) {
      z[x][y] = 0; //specify a default value for now
    }
  }

  button = createButton('Play/Pause');
  button.mousePressed(toggleSong);
  amp = new p5.Amplitude();
}




function draw() {
	orbitControl();
 	rotateX(460 * 0.01);


	var vol = amp.getLevel();
	volhistory.push(vol);

	if(volhistory.length == cols){
		if(z.length == rows)	{	z.pop();	}
		z.unshift(volhistory);
		volhistory = [];
	}

	//camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ])

	background(50);
	stroke(200,200,255,200);
  fill(200,200,200, 50);

	translate(-xSize/2, -ySize/2, 0);
	for (var x = 0; x < cols; x++) {
		beginShape(TRIANGLE_STRIP);
		for (var y = rows-1; y > 0; y--) {
			vertex(x*scl, y*scl, -z[x][y]*500);
      vertex(x*scl, (y+1)*scl, -z[x][y+1]*500);
		}
		endShape();
	}
	translate(xSize/2, ySize/2, 0);
/*
	stroke(0,200,200); //X    YELLOW
	beginShape(LINES); vertex(-1000, 0, 0); vertex(1000, 0, 0); endShape();
	stroke(200,0,200); //X    MAGENTA
	beginShape(LINES); vertex(0, -1000, 0); vertex(0, 1000, 0); endShape();
	stroke(200,200,0); //Y    CYAN
	beginShape(LINES); vertex(0, 0, -1000); vertex(0, 0, 1000); endShape();
	noStroke();
*/
}
