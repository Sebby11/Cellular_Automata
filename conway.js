class conway{
	constructor(x, y){
		this.xPos = x;
		this.yPos = y;
		//var tmp = Math.ranom();
		//if(tmp > 0.3)
		this.state = Math.floor(Math.random() * 3);
	}

	show(){
		if(this.state == 0)
			fill(0, 0, 0);
		else if(this.state == 1)
			fill(255, 165, 0);
		else if(this.state == 2)
			fill(0, 255, 255);
		else if(this.state == 3)
			fill(255, 0, 0);
		else if(this.state == 4)
			fill(143, 222, 44);
		else
			fill(98, 22, 202);

		square(this.xPos, this.yPos, 100);
	}
}