class conway{
	constructor(x, y){
		this.xPos = x;
		this.yPos = y;
		if(random() >= 0.85)
			this.on = true;
		else
			this.on = false;
	}

	show(i, j){
		if(this.on)
			fill(255, 255, 255, 255);
		else
			fill(0, 0, 0, 255);
		square(this.xPos, this.yPos, 100);
	}
}