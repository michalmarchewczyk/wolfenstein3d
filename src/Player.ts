const COLLISION_PADDING = 0.2;

class Player {
	public speed = 0;
	public rotationSpeed = 0;
	public speedMultiplier = 1;

	constructor(public x = 5.5, public y = 5.5, public dir:number = 0, public checkWall:(x:number,y:number)=>boolean = ()=>false){

	}

	move(x:number, y:number):void {
		this.x += x;
		if(this.checkWall(this.x, this.y) || this.checkWall(this.x + COLLISION_PADDING * Math.sign(x), this.y)){
			this.x -= x;
		}
		this.y += y;
		if(this.checkWall(this.x, this.y) || this.checkWall(this.x, this.y + COLLISION_PADDING * Math.sign(y))){
			this.y -= y;
		}
	}

	rotate(dir:number):void {
		this.dir += dir;
		this.dir = (this.dir + 2 * Math.PI) % (2 * Math.PI);
		if(this.dir > Math.PI){
			this.dir = this.dir - 2 * Math.PI;
		}
	}


	tick(delta:number){
		this.rotate(this.rotationSpeed * delta);
		this.move(
			Math.cos(this.dir) * this.speed * this.speedMultiplier * delta,
			Math.sin(this.dir) * this.speed * this.speedMultiplier * delta,
		);
	}
}


export default Player;
