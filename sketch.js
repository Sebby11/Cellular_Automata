let places = [];
let tmpArr = [];
var fps = 13;
var n = 3;
var size = 10;

function setup() {
	// put setup code here
	spdDownButton = createButton("Speed--");
	spdUpButton = createButton("Speed++");

	spdDownButton.mousePressed(speedDown);
	spdUpButton.mousePressed(speedUp);

	smallButton = createButton("Reset");
	smallButton.mousePressed(resetCanvas);

	createCanvas(1000, 1000);
	setSize(size);
}

function draw() {
	background(0);
	frameRate(fps);

	//loop recognizing squares on grid
	for(var i = 0; i < places.length; i++){
		for(var j= 0; j <places.length; j++){
			//console.log("This place: ", places[i][j]);
			places[i][j].show();
		}
	}

	//Clone array
	tmpArr = [];
	tmpArr = copyArr(places);
	
	//Find the new board
	for(var i = 0; i < places.length; i++){
		for(var j= 0; j < places.length; j++){
			moduloCheck(i, j);
		}
	}

	//set places equal to new grid
	places = [];
	places = copyArr(tmpArr);
}

function moduloCheck(row, col){
	var cnt = 0;

	//check top & not top row
	if(row != 0 && places[row - 1][col].state == (places[row][col].state + 1) % n){
		cnt++;
	}

	//check bottom & not bottom row
	if(row != places.length - 1 && places[row + 1][col].state == (places[row][col].state + 1) % n){
		cnt++;
	}

	//check right & not rightmost column
	if(col != places.length - 1 && places[row][col + 1].state == (places[row][col].state + 1) % n){
		cnt++;
	}

	//check left & not leftmost column
	if(col != 0 && places[row][col - 1].state == (places[row][col].state + 1) % n){
		cnt++;
	}

	//Use this & comment out the rest to view land takeover
	if(cnt == 2)
		tmpArr[row][col].state = (places[row][col].state + 1) % n;
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

function resetCanvas(){
	canSize = 0;
	setSize(10);
}

function setSize(x){
	size = x;
	places = [];
	let tmp = [];
		for(var row = 0; row < width; row += x){
			for(var col = 0; col < height; col += x){
				tmp.push(new conway(col, row));
			}
			places.push(tmp);
			tmp = [];
		}
}

function copyArr(arr){
	let tmparr = [];
	let tmp = [];
		for(var row = 0; row < width; row += size){
			for(var col = 0; col < height; col += size){
				tmp.push(new conway(col, row));
				tmp[col/size].state = arr[row/size][col/size].state;
			}
			tmparr.push(tmp);
			tmp = [];
		}
	return tmparr;
}