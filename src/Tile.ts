type tileType = 'null' | 'wall';

class Tile {
	constructor(public x:number, public y:number, public type:tileType = 'null'){

	}
}

export default Tile;
