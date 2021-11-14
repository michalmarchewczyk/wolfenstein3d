import Entity from '@src/entities/Entity';
import Door from '@src/entities/Door';
import HiddenDoor from '@src/entities/HiddenDoor';
import {spriteTextures} from '@src/sprites/SpriteTexture';

const entities:Entity[] = [
	new Door(33.5, 49.5, 'NS'),
	new Door(37.5, 49.5, 'NS'),
	new Door(33.5, 44.5, 'NS'),
	new Door(37.5, 44.5, 'NS'),
	new Door(35.5, 42.5, 'EW'),
	new Door(35.5, 31.5, 'EW'),
	new Door(44.5, 26.5, 'NS'),
	new Door(54.5, 26.5, 'NS'),
	new Door(51.5, 37.5, 'NS'),
	new Door(35.5, 21.5, 'EW'),
	new Door(35.5, 8.5, 'EW'),
	new Door(29.5, 4.5, 'NS'),
	new Door(41.5, 4.5, 'NS'),
	new Door(15.5, 10.5, 'NS'),
	new Door(10.5, 14.5, 'EW'),
	new Door(10.5, 21.5, 'EW'),
	new Door(10.5, 31.5, 'EW'),
	new Door(2.5, 16.5, 'EW'),
	new Door(5.5, 26.5, 'NS'),
	new Door(17.5, 40.5, 'NS'),

	new HiddenDoor(31.5, 15.5, 'WE', spriteTextures.woodWall2),
	new HiddenDoor(10.5, 6.5, 'SN', spriteTextures.stoneWall4),
	new HiddenDoor(18.5, 42.5, 'NS', spriteTextures.stoneWall),
	new HiddenDoor(17.5, 43.5, 'WE', spriteTextures.stoneWall),
	new HiddenDoor(13.5, 46.5, 'NS', spriteTextures.stoneWall),
];


export {
	entities
};
