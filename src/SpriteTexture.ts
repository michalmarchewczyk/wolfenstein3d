import sprites from './assets/sprites.png';

class SpriteTexture {
	constructor(
		public xImg: number = 128,
		public yImg:number = 128,){
	}
}

export default SpriteTexture;

export const spriteTextures = {
	debug: new SpriteTexture(0, 0),
	lamp1: new SpriteTexture(0, 129),
	lamp2: new SpriteTexture(129, 129),
	lamp3: new SpriteTexture(129, 387),
	column: new SpriteTexture(516, 129),
	table: new SpriteTexture(516, 0),
	door: new SpriteTexture(387, 1032),
	door2: new SpriteTexture(516, 1032),
};

const spriteTexture = new Image();
spriteTexture.src = sprites;

export {spriteTexture};
