import SpriteTexture, {spriteTextures} from '@src/SpriteTexture';

class Sprite {
	constructor(public x:number, public y:number, public texture:SpriteTexture = spriteTextures.lamp3){

	}
}

export default Sprite;
