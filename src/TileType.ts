import textures from './assets/textures.png';

class TileType {
	constructor(
		public xImg:number = 128,
		public yImg:number = 128,
		public opaque:boolean = true,) {
	}
}

export default TileType;

export const tileTypes = {
	null: new TileType(0, 0, false),
	stoneWall: new TileType(0, 0, true),
	stoneWall2: new TileType(128, 0, true),
	stoneWall3: new TileType(256, 0, true),
	stoneWall4: new TileType(0, 64, true),
	stoneWall5: new TileType(256, 64, true),
	cell: new TileType(128, 64, true),
	cell2: new TileType(0, 128, true),
	blueWall: new TileType(128, 128, true),
	blueWall2: new TileType(256, 128, true),
	woodWall: new TileType(256, 192, true),
	woodWall2: new TileType(0, 192, true),
	woodWall3: new TileType(128, 192, true),
	metalWall: new TileType(0, 256, true),
	metalWall2: new TileType(128, 256, true),
	metalWall3: new TileType(256, 256, true),
	door: new TileType(128, 1024, true),
	door2: new TileType(256, 1024, true),
	elevator: new TileType(0, 1088, true),
	elevator2: new TileType(128, 1088, true),
	elevator3: new TileType(256, 1088, true),
	elevator4: new TileType(320, 1088, true),
	elevator5: new TileType(64, 1152, true),

};

const tileTexture = new Image();
tileTexture.src = textures;

export {tileTexture};
