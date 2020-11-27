let places = [];
var fps = 5;

function setup() {
	// put setup code here
	spdDownButton = createButton("Speed--");
	spdUpButton = createButton("Speed++");

	spdDownButton.mousePressed(speedDown);
	spdUpButton.mousePressed(speedUp);

	createCanvas(1000, 1000);
	let tmp = [];
	for(var row = 0; row < width; row += 20){
		for(var col = 0; col < height; col += 20){
			tmp.push(new conway(col, row));
		}
		places.push(tmp);
		tmp = [];
	}
	//frameRate(fps);
}


function draw() {
	background(0);
	frameRate(fps);
	//loop recognizing squares on grid
	for(let arrOfBlocks of places){
		for(let places of arrOfBlocks){
			places.show();
		}
	}

	var colorChange = 0;
	for(var i = 0; i < places.length; i++){
		for(var j= 0; j <places.length; j++){
			var n = numNeibs(i, j);

			//live cell w/ <2 dies
			if(places[i][j].on && n < 2)
				places[i][j].on = false;
			//live cell w/ 2 or 3 live neighbors lives
			else if(places[i][j].on && (n == 2 || n == 3))
				places[i][j].on = true;
			//live cell w/ > 3 live neighbors dies
			else if(places[i][j].on && n > 3)
				places[i][j].on = false;
			//dead cell w/ = 3 neighbors lives
			else if(!places[i][j].on && n == 3)
				places[i][j].on = true;
		}
	}
}

function numNeibs(row, col){
	var cnt = 0;
	//check top & not top row
	if(row != 0 && places[row - 1][col].on){
		cnt++;
	}

	//check bottom & not bottom row
	if(row != places.length - 1 && places[row + 1][col].on){
		cnt++;
	}

	//check right & not rightmost column
	if(col != places.length - 1 && places[row][col + 1].on){
		cnt++;
	}

	//check left & not leftmost column
	if(col != 0 && places[row][col - 1].on){
		cnt++;
	}

	//check top right
	if(row != 0 && col != places.length - 1 && places[row - 1][col + 1].on){
		cnt++;
	}

	//check top left
	if(row != 0 && col != 0 && places[row - 1][col - 1].on){
		cnt++;
	}

	//check bottom right
	if(row != places.length - 1 && col != places.length - 1 && places[row + 1][col + 1].on){
		cnt++;
	}


	//check bottom left
	if(row != places.length - 1 && col != 0 && places[row + 1][col - 1].on){
		cnt++;
	}

	return cnt
}

function speedUp(){
	fps += 0.4;
	console.log(fps);
}

function speedDown(){
	if(!((fps - 0.4) < 0))
		fps -= 0.4;
	console.log(fps);
}