import Entity from '@src/Entity';
import Sprite, {SpriteType} from '@src/Sprite';
import {spriteTextures} from '@src/SpriteTexture';

class Door implements Entity {
	public state = 1;
	public changing = false;
	public activate:() => void = () => {return;};

	constructor(public x:number = 0, public y:number = 0, public collision: boolean = true, public sprites:Sprite[] = []){
		this.sprites.push(new Sprite(this.x, this.y, spriteTextures.door, SpriteType.NS));
		this.sprites.push(new Sprite(this.x, this.y+0.49, spriteTextures.door2, SpriteType.EW));
		this.sprites.push(new Sprite(this.x, this.y-0.49, spriteTextures.door2, SpriteType.EW));
		this.activate = () => {
			if(this.changing) return;
			this.changing = true;
		};
	}

	public tick(delta:number){
		if(!this.changing) return;
		if(this.state === 1){
			this.sprites[0].y += delta * 2;
			if(this.sprites[0].y >= this.y + 1){
				this.sprites[0].y = this.y + 1;
				this.changing = false;
				this.state = 0;
				this.collision = false;
				setTimeout(() => {
					if(this.state === 0){
						this.activate();
					}
				}, 8000);
				return;
			}
		}else{
			this.sprites[0].y -= delta * 2;
			if(this.sprites[0].y <= this.y){
				this.sprites[0].y = this.y;
				this.changing = false;
				this.state = 1;
				this.collision = true;
				return;
			}
		}
	}
}

export default Door;
