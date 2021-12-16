import Entity from '@src/entities/Entity';
import Sprite from '@src/sprites/Sprite';
import Vector from '@src/utils/math/Vector';
import Player from '@src/Player';
import Enemy from '@src/entities/Enemy';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Raycaster from '@src/utils/math/Raycaster';
import {calcDist} from '@src/utils/math/distance';

class Guard implements Entity, Enemy {
	public sprites: Sprite[] = [];
	public collision = true;
	public direction = Math.PI/-2;
	public health = 30;
	public moving = false;
	private time = 0;
	private lastShot = 0;
	private dead = false;
	private lastDeath = 0;
	private lastSeenPlayer = 0;
	private lastFired = 0;
	private readyToShoot = false;
	private shootTimeout:NodeJS.Timeout|null = null;
	private lastVector:Vector|null = null;

	constructor(public x:number, public y:number,public path:Vector[] = []){
		this.sprites = [new Sprite(x, y, spriteTextures.guardS)];
		if(this.path.length > 0){
			this.lastVector = path[0];
		}
	}

	tick():void {
		//
	}

	tickEnemy(delta:number, player:Player, raycaster:Raycaster):boolean {
		this.readyToShoot = false;

		if(this.dead){
			const sinceDeath = Date.now()/1000 - this.lastDeath;
			if(sinceDeath < 0.2){
				this.sprites[0].texture = spriteTextures.guardD1;
			}else if(sinceDeath >= 0.2 && sinceDeath < 0.4){
				this.sprites[0].texture = spriteTextures.guardD2;
			}else if(sinceDeath >= 0.4 && sinceDeath < 0.6){
				this.sprites[0].texture = spriteTextures.guardD3;
			}else if(sinceDeath >= 0.6 && sinceDeath < 0.8){
				this.sprites[0].texture = spriteTextures.guardD4;
			}else{
				this.sprites[0].texture = spriteTextures.guardD5;
			}

			return false;
		}

		this.sprites[0].x = this.x;
		this.sprites[0].y = this.y;

		let angle = Math.atan2(this.y - player.y, this.x - player.x) + Math.PI;
		angle = angle + this.direction + 2 * Math.PI;
		angle = angle % (2*Math.PI);
		angle = angle - Math.PI;
		angle = angle / Math.PI;
		let tex = '';
		this.time += delta*2;
		if(this.moving){
			tex = (Math.floor(this.time)%4+1).toString();
		}
		if(angle < -7/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'N'];
		}else if(angle >= -7/8 && angle < -5/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'NW'];
		}else if(angle >= -5/8 && angle < -3/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'W'];
		}else if(angle >= -3/8 && angle < -1/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'SW'];
		}else if(angle >= -1/8 && angle < 1/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'S'];
		}else if(angle >= 1/8 && angle < 3/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'SE'];
		}else if(angle >= 3/8 && angle < 5/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'E'];
		}else if(angle >= 5/8 && angle < 7/8){
			this.sprites[0].texture = spriteTextures['guard'+tex+'NE'];
		}else{
			this.sprites[0].texture = spriteTextures['guard'+tex+'N'];
		}

		const dist = calcDist(this.x, this.y, player.x, player.y);

		const raycastPlayer = raycaster.raycast(
			new Vector(player.x - this.x, player.y - this.y),
			new Vector(this.x, this.y)
		);
		const seeingPlayer = (angle > -1/2 && angle < 1/2) && raycastPlayer.distance > dist;

		if(seeingPlayer){
			this.moving = false;
			this.sprites[0].texture = spriteTextures.guardF2;
			this.lookAtPlayer(angle);
		}

		if(Date.now()/1000 - this.lastShot < 0.3){
			this.sprites[0].texture = spriteTextures.guardShot;
		}

		if(Date.now()/1000 - this.lastFired < 0.3){
			this.sprites[0].texture = spriteTextures.guardF3;
		}

		if(player.firing){
			const aimed = this.checkPlayerAim(player);
			if(aimed && this.lastShot != player.lastFire){
				this.lastShot = player.lastFire;
				this.lookAtPlayer(angle);
				if(player.weapon.range > dist && raycastPlayer.distance > dist){
					this.health = this.health - player.weapon.damage;
					if(this.health < 0){
						this.dead = true;
						this.collision = false;
						this.lastDeath = Date.now()/1000;
						return true;
					}
				}
			}
		}

		if(this.readyToShoot && Date.now()/1000 - this.lastFired > 0.5){
			if(!this.shootTimeout){
				this.shootTimeout = setTimeout(() => {
					this.fire(player);
					this.shootTimeout = null;
				}, 500);
			}
		}else{
			if(this.shootTimeout){
				clearTimeout(this.shootTimeout);
				this.shootTimeout = null;
			}
		}


		if(Date.now()/1000 - this.lastSeenPlayer > 5 && this.path.length > 0){
			this.moving = true;
		}

		if(this.moving){
			this.move(delta);
		}

		return false;
	}

	lookAtPlayer(angle: number) {
		this.direction = (this.direction - angle * Math.PI + 2*Math.PI) % (2*Math.PI);
		this.lastSeenPlayer = Date.now()/1000;
		this.readyToShoot = angle < 0.001;
	}

	checkPlayerAim(player:Player):boolean {
		const dist = calcDist(this.x, this.y, player.x, player.y);
		let angle = Math.atan2(player.y - this.y, player.x - this.x);
		angle = angle - player.dir + 2 * Math.PI;
		angle = angle % (2*Math.PI);
		angle = angle - Math.PI;
		angle = angle / Math.PI;
		return angle >= -0.2/dist && angle <= 0.2/dist;
	}

	fire(player:Player){
		this.lastFired = Date.now()/1000;
		player.health -= Math.floor(Math.random()*10+5);
	}

	move(delta:number){
		if(this.path.length < 1){
			return;
		}
		const nextVectorIndex = (this.path.findIndex(v => v===this.lastVector) + 1) % this.path.length;
		const nextVector = this.path[nextVectorIndex];
		if(Math.abs(nextVector.x - this.x) < 0.1 && Math.abs(nextVector.y - this.y) < 0.1){
			this.lastVector = nextVector;
			return;
		}
		this.x += Math.sign(nextVector.x - this.x) * delta;
		this.y += Math.sign(nextVector.y - this.y) * delta;
		this.direction = Math.atan2(
			Math.sign(nextVector.y - this.y),
			Math.sign(this.x - nextVector.x)
		);
	}

	activate() {
		//
	}
}

export default Guard;
