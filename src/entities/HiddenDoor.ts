import Entity from '@src/entities/Entity';
import Sprite, {SpriteType} from '@src/sprites/Sprite';
import SpriteTexture, {spriteTextures} from '@src/sprites/SpriteTexture';

class HiddenDoor implements Entity {
	public state = 1;
	public collision = true;
	public sprites:Sprite[] = [];
	private changing = false;
	private readonly goalX:number = 0;
	private readonly goalY:number = 0;

	constructor(public x:number = 0, public y:number = 0, public direction:'NS' | 'EW' | 'SN' | 'WE' = 'NS', public texture:SpriteTexture = spriteTextures.debug) {
		this.sprites = [
			new Sprite(this.x - 0.5, this.y, this.texture, true, SpriteType.NS),
			new Sprite(this.x + 0.5, this.y, this.texture, true, SpriteType.NS),
			new Sprite(this.x, this.y - 0.5, this.texture, true, SpriteType.EW),
			new Sprite(this.x, this.y + 0.5, this.texture, true, SpriteType.EW),
		];
		if (this.direction === 'NS') {
			this.goalX = this.x;
			this.goalY = this.y + 2;
		} else if (this.direction === 'EW') {
			this.goalX = this.x + 2;
			this.goalY = this.y;
		} else if (this.direction === 'SN') {
			this.goalX = this.x;
			this.goalY = this.y - 2;
		} else if (this.direction === 'WE') {
			this.goalX = this.x - 2;
			this.goalY = this.y;
		}
	}

	activate() {
		if (this.state === 1) {
			this.state = 0;
			this.changing = true;
		}
	}

	public tick(delta:number) {
		if (!this.changing) return;
		if (((this.direction === 'NS' || this.direction === 'EW') && (this.x >= this.goalX && this.y >= this.goalY)) ||
			((this.direction === 'SN' || this.direction === 'WE') && (this.x <= this.goalX && this.y <= this.goalY))) {
			this.x = this.goalX;
			this.y = this.goalY;
			this.changing = false;
			this.updateSprites();
		} else {
			this.x += Math.sign(this.goalX - this.x) * delta;
			this.y += Math.sign(this.goalY - this.y) * delta;
			this.updateSprites();
		}

	}

	private updateSprites() {
		this.sprites[0].x = this.x - 0.5;
		this.sprites[0].y = this.y;
		this.sprites[1].x = this.x + 0.5;
		this.sprites[1].y = this.y;
		this.sprites[2].x = this.x;
		this.sprites[2].y = this.y - 0.5;
		this.sprites[3].x = this.x;
		this.sprites[3].y = this.y + 0.5;
	}

}


export default HiddenDoor;
