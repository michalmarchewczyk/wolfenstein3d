import TileType, {tileTypes} from '@src/TileType';




class Tile {
	constructor(public x:number, public y:number, public type:TileType = tileTypes.null){

	}
}

export default Tile;
