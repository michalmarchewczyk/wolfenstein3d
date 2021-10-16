class Player {
	public speed = 0;
	public rotationSpeed = 0;

	constructor(public x = 5.2, public y = 5.2, public dir:number = 0){

	}

	move(x:number, y:number):void {
		this.x += x;
		this.y += y;
	}

	rotate(dir:number):void {
		this.dir += dir;
	}


	tick(delta:number){
		this.rotate(this.rotationSpeed * delta);
		this.move(
			Math.cos(this.dir) * this.speed * delta,
			Math.sin(this.dir) * this.speed * delta,
		);
	}
}


export default Player;
