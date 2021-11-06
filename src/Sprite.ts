import SpriteTexture, {spriteTextures} from '@src/SpriteTexture';

enum SpriteType {
	Normal,
	NS,
	EW
}

class Sprite {
	constructor(
		public x:number,
		public y:number,
		public texture:SpriteTexture = spriteTextures.lamp3,
		public collision:boolean = false,
		public type:SpriteType = SpriteType.Normal
	){

	}
}

export default Sprite;

export {
	SpriteType
};
