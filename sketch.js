let places = [];
let tmpArr = [];
var fps = 5;
var canSize = 1; //0 - small / 1 - medium / 3 - large
var n = 3;
var size = 150;

function setup() {
	// put setup code here
	spdDownButton = createButton("Speed--");
	spdUpButton = createButton("Speed++");

	spdDownButton.mousePressed(speedDown);
	spdUpButton.mousePressed(speedUp);

	smallButton = createButton("Small");
	smallButton.mousePressed(smallCanvas);
	mediumButton = createButton("Medium");
	mediumButton.mousePressed(medCanvas);
	LargeButton = createButton("Large");
	LargeButton.mousePressed(largeCanvas);

	createCanvas(1000, 1000);
	setSize(size);
	//frameRate(fps);
}

var tmpCan = 1;
function draw() {
	if(canSize == 0 && canSize != tmpCan){
		setSize(10);
	}
	else if(canSize == 1 && canSize != tmpCan){
		setSize(20);
	}
	else if(canSize == 2 && canSize != tmpCan){
		setSize(40);
	}

	tmpCan = canSize;

	background(0);
	frameRate(fps);
	//loop recognizing squares on grid
	for(var i = 0; i < places.length; i++){
		for(var j= 0; j <places.length; j++){
			//console.log("This place: ", places[i][j]);
			places[i][j].show();
		}
	}
	//alert();

	//Clone array
	tmpArr = [];
	tmpArr = copyArr(places);
	
	//Find the new board
	for(var i = 0; i < places.length; i++){
		for(var j= 0; j < places.length; j++){
			moduloCheck(i, j);
		}
	}


	//set places equal to clone
	places = [];
	places = copyArr(tmpArr);
	//alert();
}

function moduloCheck(row, col){
	var cnt = 0;

	//check top & not top row
	if(row != 0 && places[row - 1][col].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}

	//check bottom & not bottom row
	if(row != places.length - 1 && places[row + 1][col].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}

	//check right & not rightmost column
	if(col != places.length - 1 && places[row][col + 1].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}

	//check left & not leftmost column
	if(col != 0 && places[row][col - 1].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}


	//check top right
	if(row != 0 && col != places.length - 1 && places[row - 1][col + 1].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}

	//check top left
	if(row != 0 && col != 0 && places[row - 1][col - 1].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}

	//check bottom right
	if(row != places.length - 1 && col != places.length - 1 && places[row + 1][col + 1].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}


	//check bottom left
	if(row != places.length - 1 && col != 0 && places[row + 1][col - 1].state == (places[row][col].state + 1) % n){
		//tmpArr[row][col].state = (places[row][col].state + 1) % n;
		//return;
		cnt++;
	}
	
	if(cnt >= 3)
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

function smallCanvas(){
	canSize = 0;
	setSize(10);
}


function medCanvas(){
	canSize = 1;
}


function largeCanvas(){
	canSize = 2;
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
	//console.log("arr: ", arr);
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