import textures from './assets/textures.png';

class TileType {
	constructor(
		public xImg: number = 128,
		public yImg:number = 128,
		public opaque:boolean = true,){
	}
}

export default TileType;

export const tileTypes = {
	nullTile: new TileType(0, 0, false),
	wallTile: new TileType(128, 128, true),
	wall2Tile: new TileType(256, 128, true),
	wall3Tile: new TileType(0, 0, true),
	wall4Tile: new TileType(128, 0, true),
	cellTile: new TileType(128, 64, true),
	cell2Tile: new TileType(0, 128, true),
};

const tileTexture = new Image();
tileTexture.src = textures;

export {tileTexture};
