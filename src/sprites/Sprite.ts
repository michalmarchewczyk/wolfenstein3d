import SpriteTexture, {spriteTextures} from '@src/sprites/SpriteTexture';

enum SpriteType {
	Normal,
	NS,
	EW
}

class Sprite {
	constructor(
		public x:number,
		public y:number,
		public texture:SpriteTexture = spriteTextures.debug,
		public collision:boolean = false,
		public type:SpriteType = SpriteType.Normal
	) {

	}
}

export default Sprite;

export {
	SpriteType
};
