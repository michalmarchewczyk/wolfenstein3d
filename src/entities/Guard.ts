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

	constructor(public x:number, public y:number,public route:Vector[] = []){
		this.sprites = [new Sprite(x, y, spriteTextures.guardS)];
	}

	tick():void {
		//
	}

	tickEnemy(delta:number, player:Player, raycaster:Raycaster):void {
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

			return;
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
		}

		if(Date.now()/1000 - this.lastShot < 0.3){
			this.sprites[0].texture = spriteTextures.guardShot;
		}

		if(player.firing){
			const aimed = this.checkPlayerAim(player);
			if(aimed && this.lastShot != player.lastFire){
				this.lastShot = player.lastFire;
				if(player.weapon.range > dist && raycastPlayer.distance > dist){
					this.health = this.health - player.weapon.damage;
					if(this.health < 0){
						this.dead = true;
						this.lastDeath = Date.now()/1000;
					}
				}
			}
		}
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

	fire(){
		//
	}

	activate() {
		//
	}
}

export default Guard;