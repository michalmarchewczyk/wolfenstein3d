import Sprite from '@src/Sprite';
import Entity from '@src/Entity';
import Door from '@src/Door';
import {spriteTextures} from '@src/SpriteTexture';

const sprites:Sprite[] = [
	new Sprite(35.5, 53.5, spriteTextures.lamp3),
	new Sprite(31.5, 53.5, spriteTextures.lamp3),
	new Sprite(39.5, 53.5, spriteTextures.lamp3),
	new Sprite(35.5, 49.5, spriteTextures.lamp3),
	new Sprite(35.5, 44.5, spriteTextures.lamp3),
];

const entities:Entity[] = [
	new Door(33.5, 49.5, 'NS'),
	new Door(37.5, 49.5, 'NS'),
	new Door(33.5, 44.5, 'NS'),
	new Door(37.5, 44.5, 'NS'),
	new Door(35.5, 42.5, 'EW'),
	new Door(35.5, 31.5, 'EW'),
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
];


export {
	sprites,
	entities
};
