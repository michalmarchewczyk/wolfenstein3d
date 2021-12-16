import sprites from '../assets/sprites.png';
import spritesMirrored from '../assets/spritesMirrored.png';

class SpriteTexture {
	constructor(
		public xImg:number = 128,
		public yImg:number = 128,) {
	}
}

export default SpriteTexture;

interface SpriteTextures {
	[id: string]: SpriteTexture;
}

export const spriteTextures:SpriteTextures = {
	debug: new SpriteTexture(0, 0),
	null: new SpriteTexture(129, 1548),

	lamp: new SpriteTexture(129, 387),
	column: new SpriteTexture(516, 129),
	door: new SpriteTexture(387, 1032),
	door2: new SpriteTexture(516, 1032),
	doorSteel: new SpriteTexture(129, 1419),

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

	guardS: new SpriteTexture(645, 0),
	guardSW: new SpriteTexture(774, 0),
	guardW: new SpriteTexture(903, 0),
	guardNW: new SpriteTexture(1032, 0),
	guardN: new SpriteTexture(1161, 0),
	guardNE: new SpriteTexture(1290, 0),
	guardE: new SpriteTexture(1419, 0),
	guardSE: new SpriteTexture(1548, 0),

	guard1S: new SpriteTexture(645, 129),
	guard1SW: new SpriteTexture(774, 129),
	guard1W: new SpriteTexture(903, 129),
	guard1NW: new SpriteTexture(1032, 129),
	guard1N: new SpriteTexture(1161, 129),
	guard1NE: new SpriteTexture(1290, 129),
	guard1E: new SpriteTexture(1419, 129),
	guard1SE: new SpriteTexture(1548, 129),

	guard2S: new SpriteTexture(645, 258),
	guard2SW: new SpriteTexture(774, 258),
	guard2W: new SpriteTexture(903, 258),
	guard2NW: new SpriteTexture(1032, 258),
	guard2N: new SpriteTexture(1161, 258),
	guard2NE: new SpriteTexture(1290, 258),
	guard2E: new SpriteTexture(1419, 258),
	guard2SE: new SpriteTexture(1548, 258),

	guard3S: new SpriteTexture(645, 387),
	guard3SW: new SpriteTexture(774, 387),
	guard3W: new SpriteTexture(903, 387),
	guard3NW: new SpriteTexture(1032, 387),
	guard3N: new SpriteTexture(1161, 387),
	guard3NE: new SpriteTexture(1290, 387),
	guard3E: new SpriteTexture(1419, 387),
	guard3SE: new SpriteTexture(1548, 387),

	guard4S: new SpriteTexture(645, 516),
	guard4SW: new SpriteTexture(774, 516),
	guard4W: new SpriteTexture(903, 516),
	guard4NW: new SpriteTexture(1032, 516),
	guard4N: new SpriteTexture(1161, 516),
	guard4NE: new SpriteTexture(1290, 516),
	guard4E: new SpriteTexture(1419, 516),
	guard4SE: new SpriteTexture(1548, 516),

	guardD1: new SpriteTexture(645, 645),
	guardD2: new SpriteTexture(774, 645),
	guardD3: new SpriteTexture(903, 645),
	guardD4: new SpriteTexture(1032, 645),
	guardD5: new SpriteTexture(1161, 645),

	guardShot: new SpriteTexture(1548, 645),

	guardF1: new SpriteTexture(645, 774),
	guardF2: new SpriteTexture(774, 774),
	guardF3: new SpriteTexture(903, 774),


};

const spriteTexture = new Image();
spriteTexture.src = sprites;

const spriteTextureMirrored = new Image();
spriteTextureMirrored.src = spritesMirrored;

export {spriteTexture, spriteTextureMirrored};
