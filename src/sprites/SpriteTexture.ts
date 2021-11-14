import sprites from '../assets/sprites.png';
import spritesMirrored from '../assets/spritesMirrored.png';

class SpriteTexture {
	constructor(
		public xImg:number = 128,
		public yImg:number = 128,) {
	}
}

export default SpriteTexture;

export const spriteTextures = {
	debug: new SpriteTexture(0, 0),
	lamp: new SpriteTexture(129, 387),
	column: new SpriteTexture(516, 129),
	door: new SpriteTexture(387, 1032),
	door2: new SpriteTexture(516, 1032),

	chicken: new SpriteTexture(129, 645),
	ammoBox: new SpriteTexture(387, 645),
	bones: new SpriteTexture(129, 516),
	skeleton: new SpriteTexture(129, 903),
	brownPlant: new SpriteTexture(387, 258),
	chandelier: new SpriteTexture(129, 129),
	brownBowl: new SpriteTexture(0, 645),
	dogFood: new SpriteTexture(387, 129),
	table: new SpriteTexture(0, 387),
	barrel: new SpriteTexture(258, 903),
	well: new SpriteTexture(516, 903),
	wellFull: new SpriteTexture(387, 903),
	knight: new SpriteTexture(387, 387),
	aidKit: new SpriteTexture(258, 645),
	rifle: new SpriteTexture(516, 645),
	goldCross: new SpriteTexture(129, 774),
	goldCup: new SpriteTexture(258, 774),
	tableChairs: new SpriteTexture(516, 0),
	blueVase: new SpriteTexture(516, 258),
	standingLamp: new SpriteTexture(0, 129),
	whitePlant: new SpriteTexture(0, 258),
	flag: new SpriteTexture(129, 1032),
	goldBox: new SpriteTexture(387, 774),
	greenBarrel: new SpriteTexture(387, 0),
	face: new SpriteTexture(0, 903),

	stoneWall: new SpriteTexture(0, 1290),
	stoneWall4: new SpriteTexture(0, 1161),
	woodWall2: new SpriteTexture(0, 1032),

};

const spriteTexture = new Image();
spriteTexture.src = sprites;

const spriteTextureMirrored = new Image();
spriteTextureMirrored.src = spritesMirrored;

export {spriteTexture, spriteTextureMirrored};
