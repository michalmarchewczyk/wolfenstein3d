import {COLLISION_PADDING} from '@src/settings';
import Weapon, {weapons} from '@src/Weapon';

class Player {
	public speed = 0;
	public rotationSpeed = 0;
	public speedMultiplier = 1;
	public health = 100;
	public ammo = 8;
	public lives = 3;
	public score = 0;
	public weapon:Weapon = weapons[1];
	public hiddenWeapon = weapons[1];
	public lastFire = 0;
	public firing = false;

	constructor(public x = 5.5, public y = 5.5, public dir:number = 0, public checkWall:(x:number, y:number) => boolean = () => false) {

	}

	move(x:number, y:number):void {
		this.x += x;
		if (this.checkWall(this.x, this.y) || this.checkWall(this.x + COLLISION_PADDING * Math.sign(x), this.y)) {
			this.x -= x;
		}
		this.y += y;
		if (this.checkWall(this.x, this.y) || this.checkWall(this.x, this.y + COLLISION_PADDING * Math.sign(y))) {
			this.y -= y;
		}
	}

	rotate(dir:number):void {
		this.dir += dir;
		this.dir = (this.dir + 2 * Math.PI) % (2 * Math.PI);
		if (this.dir > Math.PI) {
			this.dir = this.dir - 2 * Math.PI;
		}
	}


	tick(delta:number) {
		this.rotate(this.rotationSpeed * delta);
		this.move(
			Math.cos(this.dir) * this.speed * this.speedMultiplier * delta,
			Math.sin(this.dir) * this.speed * this.speedMultiplier * delta,
		);
	}

	fire() {
		const currentTime = Date.now() / 1000;
		if (currentTime - this.lastFire > this.weapon.delay) {
			this.lastFire = Date.now() / 1000;
			if(this.weapon !== weapons[0]){
				this.ammo = this.ammo - 1;
			}
			if(this.ammo === 0){
				setTimeout(() => {
					this.weapon = weapons[0];
				}, this.weapon.delay * 1000);
				return;
			}
			if(this.firing && this.weapon.auto){
				setTimeout(() => {
					if(!this.firing) return;
					this.fire();
				}, this.weapon.delay*1000);
			}
		}

	}
}


export default Player;
