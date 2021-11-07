import Sprite from '@src/Sprite';
import Entity from '@src/Entity';
import Door from '@src/Door';
import {spriteTextures} from '@src/SpriteTexture';
import HiddenDoor from '@src/HiddenDoor';

const sprites:Sprite[] = [

	// blue-1
	new Sprite(35.5, 53.5, spriteTextures.lamp),
	new Sprite(31.5, 53.5, spriteTextures.lamp),
	new Sprite(39.5, 53.5, spriteTextures.lamp),
	new Sprite(35.5, 49.5, spriteTextures.lamp),
	new Sprite(35.5, 44.5, spriteTextures.lamp),
	new Sprite(35.5, 54.5, spriteTextures.chicken),
	new Sprite(38.5, 49.5, spriteTextures.chicken),
	new Sprite(41.5, 53.5, spriteTextures.ammoBox),
	new Sprite(41.5, 49.5, spriteTextures.bones),
	new Sprite(39.5, 44.5, spriteTextures.skeleton),
	new Sprite(30.5, 43.5, spriteTextures.chicken),
	new Sprite(35.5, 40.5, spriteTextures.lamp),
	new Sprite(35.5, 37.5, spriteTextures.lamp),
	new Sprite(35.5, 34.5, spriteTextures.lamp),
	new Sprite(29.5, 43.5, spriteTextures.bones),

	// stone-1
	new Sprite(28.5, 29.5, spriteTextures.brownPlant),
	new Sprite(42.5, 29.5, spriteTextures.brownPlant),
	new Sprite(28.5, 23.5, spriteTextures.brownPlant),
	new Sprite(42.5, 23.5, spriteTextures.brownPlant),
	new Sprite(33.5, 22.5, spriteTextures.brownPlant),
	new Sprite(37.5, 22.5, spriteTextures.brownPlant),
	new Sprite(35.5, 26.5, spriteTextures.chandelier),
	new Sprite(30.5, 26.5, spriteTextures.chandelier),
	new Sprite(40.5, 26.5, spriteTextures.chandelier),

	// blue-2
	new Sprite(59.5, 35.5, spriteTextures.dogFood),
	new Sprite(60.5, 38.5, spriteTextures.brownBowl),
	new Sprite(57.5, 28.5, spriteTextures.table),
	new Sprite(60.5, 28.5, spriteTextures.table),
	new Sprite(60.5, 22.5, spriteTextures.barrel),
	new Sprite(61.5, 22.5, spriteTextures.barrel),
	new Sprite(62.5, 22.5, spriteTextures.barrel),
	new Sprite(55.5, 22.5, spriteTextures.chicken),
	new Sprite(58.5, 28.5, spriteTextures.chicken),
	new Sprite(61.5, 30.5, spriteTextures.chicken),
	new Sprite(60.5, 31.5, spriteTextures.well),
	new Sprite(57.5, 31.5, spriteTextures.wellFull),

	// wood-1
	new Sprite(35.5, 19.5, spriteTextures.lamp),
	new Sprite(35.5, 15.5, spriteTextures.lamp),
	new Sprite(35.5, 11.5, spriteTextures.lamp),
	new Sprite(38.5, 15.5, spriteTextures.knight),
	new Sprite(30.5, 17.5, spriteTextures.aidKit),
	new Sprite(30.5, 18.5, spriteTextures.aidKit),
	new Sprite(29.5, 18.5, spriteTextures.rifle),
	new Sprite(29.5, 17.5, spriteTextures.ammoBox),
	new Sprite(29.5, 16.5, spriteTextures.ammoBox),

	// wood-2
	new Sprite(35.5, 2.5, spriteTextures.tableChairs),
	new Sprite(32.5, 2.5, spriteTextures.tableChairs),
	new Sprite(38.5, 2.5, spriteTextures.tableChairs),
	new Sprite(35.5, 4.5, spriteTextures.chandelier),
	new Sprite(30.5, 1.5, spriteTextures.blueVase),
	new Sprite(40.5, 1.5, spriteTextures.blueVase),
	new Sprite(42.5, 5.5, spriteTextures.goldCup),
	new Sprite(43.5, 5.5, spriteTextures.goldCup),
	new Sprite(44.5, 5.5, spriteTextures.goldCup),
	new Sprite(44.5, 3.5, spriteTextures.goldCup),
	new Sprite(44.5, 4.5, spriteTextures.goldCross),
	new Sprite(43.5, 3.5, spriteTextures.goldCross),
	new Sprite(42.5, 3.5, spriteTextures.goldCross),

	// stone-2
	new Sprite(25.5, 4.5, spriteTextures.lamp),
	new Sprite(19.5, 4.5, spriteTextures.lamp),
	new Sprite(19.5, 10.5, spriteTextures.lamp),

	// stone-3
	new Sprite(10.5, 10.5, spriteTextures.tableChairs),
	new Sprite(7.5, 8.5, spriteTextures.standingLamp),
	new Sprite(13.5, 8.5, spriteTextures.standingLamp),
	new Sprite(7.5, 12.5, spriteTextures.standingLamp),
	new Sprite(13.5, 12.5, spriteTextures.standingLamp),
	new Sprite(6.5, 10.5, spriteTextures.flag),
	new Sprite(11.5, 7.5, spriteTextures.whitePlant),
	new Sprite(9.5, 7.5, spriteTextures.whitePlant),
	new Sprite(6.5, 12.5, spriteTextures.goldBox),
	new Sprite(6.5, 13.5, spriteTextures.goldBox),
	new Sprite(7.5, 13.5, spriteTextures.goldBox),
	new Sprite(12.5, 7.5, spriteTextures.goldCup),
	new Sprite(8.5, 7.5, spriteTextures.goldCup),
	new Sprite(7.5, 7.5, spriteTextures.goldCross),
	new Sprite(12.5, 8.5, spriteTextures.goldCross),
	new Sprite(6.5, 2.5, spriteTextures.ammoBox),
	new Sprite(6.5, 3.5, spriteTextures.ammoBox),
	new Sprite(6.5, 4.5, spriteTextures.ammoBox),
	new Sprite(6.5, 5.5, spriteTextures.ammoBox),
	new Sprite(7.5, 2.5, spriteTextures.ammoBox),
	new Sprite(7.5, 3.5, spriteTextures.ammoBox),
	new Sprite(7.5, 4.5, spriteTextures.ammoBox),
	new Sprite(7.5, 5.5, spriteTextures.ammoBox),
	new Sprite(8.5, 2.5, spriteTextures.goldCross),
	new Sprite(9.5, 2.5, spriteTextures.goldCross),
	new Sprite(9.5, 3.5, spriteTextures.goldCross),
	new Sprite(8.5, 3.5, spriteTextures.goldBox),
	new Sprite(8.5, 4.5, spriteTextures.goldBox),
	new Sprite(8.5, 5.5, spriteTextures.goldBox),
	new Sprite(9.5, 4.5, spriteTextures.goldBox),

	// stone-4
	new Sprite(10.5, 16.5, spriteTextures.lamp),
	new Sprite(10.5, 19.5, spriteTextures.lamp),
	new Sprite(7.5, 23.5, spriteTextures.brownPlant),
	new Sprite(13.5, 23.5, spriteTextures.brownPlant),
	new Sprite(7.5, 29.5, spriteTextures.brownPlant),
	new Sprite(13.5, 29.5, spriteTextures.brownPlant),
	new Sprite(8.5, 24.5, spriteTextures.lamp),
	new Sprite(12.5, 24.5, spriteTextures.lamp),
	new Sprite(8.5, 28.5, spriteTextures.lamp),
	new Sprite(12.5, 28.5, spriteTextures.lamp),
	new Sprite(10.5, 35.5, spriteTextures.lamp),
	new Sprite(6.5, 40.5, spriteTextures.lamp),
	new Sprite(14.5, 40.5, spriteTextures.lamp),

	// stone-5
	new Sprite(2.5, 37.5, spriteTextures.lamp),
	new Sprite(2.5, 31.5, spriteTextures.lamp),
	new Sprite(2.5, 22.5, spriteTextures.lamp),
	new Sprite(2.5, 18.5, spriteTextures.lamp),
	new Sprite(7.5, 34.5, spriteTextures.greenBarrel),
	new Sprite(5.5, 36.5, spriteTextures.chicken),
	new Sprite(7.5, 18.5, spriteTextures.chicken),
	new Sprite(7.5, 20.5, spriteTextures.goldCup),
	new Sprite(2.5, 14.5, spriteTextures.lamp),
	new Sprite(2.5, 13.5, spriteTextures.aidKit),
	new Sprite(3.5, 13.5, spriteTextures.barrel),

	// stone-6
	new Sprite(19.5, 43.5, spriteTextures.aidKit),
	new Sprite(14.5, 48.5, spriteTextures.face),

];

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
	sprites,
	entities
};
