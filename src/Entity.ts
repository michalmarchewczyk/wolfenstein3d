import Sprite from '@src/Sprite';

interface Entity {
	x: number,
	y: number,
	sprites: Sprite[],
	collision: boolean,
	tick: (delta:number) => void,
	activate: () => void,
}

export default Entity;
