import Entity from '@src/Entity';
import Sprite, {SpriteType} from '@src/Sprite';
import {spriteTextures} from '@src/SpriteTexture';

class Door implements Entity {
	public state = 1;
	public changing = false;
	public activate:() => void = () => {return;};
	public timeout:NodeJS.Timeout|null = null;

	constructor(public x:number = 0, public y:number = 0, public direction:'NS'|'EW' = 'NS', public collision: boolean = true, public sprites:Sprite[] = []){
		if(this.direction === 'NS'){
			this.sprites.push(new Sprite(this.x, this.y, spriteTextures.door, SpriteType.NS));
			this.sprites.push(new Sprite(this.x, this.y+0.49, spriteTextures.door2, SpriteType.EW));
			this.sprites.push(new Sprite(this.x, this.y-0.49, spriteTextures.door2, SpriteType.EW));
		}else{
			this.sprites.push(new Sprite(this.x, this.y, spriteTextures.door, SpriteType.EW));
			this.sprites.push(new Sprite(this.x+0.49, this.y, spriteTextures.door2, SpriteType.NS));
			this.sprites.push(new Sprite(this.x-0.49, this.y, spriteTextures.door2, SpriteType.NS));
		}
		this.activate = () => {
			if(this.timeout){
				clearTimeout(this.timeout);
			}
			if(this.changing) return;
			this.changing = true;
		};
	}

	public tick(delta:number){
		if(!this.changing) return;
		if(this.direction === 'NS'){
			this.move('y', delta);
		}else{
			this.move('x', delta);
		}
	}

	private move(axis:'x'|'y', delta = 0) {
		if(this.state === 1){
			this.sprites[0][axis] += delta * 2;
			if(this.sprites[0][axis] >= this[axis] + 1){
				this.sprites[0][axis] = this[axis] + 1;
				this.changing = false;
				this.state = 0;
				this.collision = false;
				this.timeout = setTimeout(() => {
					if(this.state === 0){
						this.activate();
					}
				}, 8000);
				return;
			}
		}else{
			this.sprites[0][axis] -= delta * 2;
			if(this.sprites[0][axis] <= this[axis]){
				this.sprites[0][axis] = this[axis];
				this.changing = false;
				this.state = 1;
				this.collision = true;
				return;
			}
		}
	}
}

export default Door;
