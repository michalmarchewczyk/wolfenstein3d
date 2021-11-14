import Sprite from '@src/sprites/Sprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Food from '@src/sprites/collectable/Food';
import AmmoBox from '@src/sprites/collectable/AmmoBox';
import DogFood from '@src/sprites/collectable/DogFood';
import AidKit from '@src/sprites/collectable/AidKit';
import GoldCup from '@src/sprites/collectable/GoldCup';
import GoldCross from '@src/sprites/collectable/GoldCross';
import GoldBox from '@src/sprites/collectable/GoldBox';
import Face from '@src/sprites/collectable/Face';
import Rifle from '@src/sprites/collectable/Rifle';

const sprites:Sprite[] = [

	// blue-1
	new Sprite(35.5, 53.5, spriteTextures.lamp),
	new Sprite(31.5, 53.5, spriteTextures.lamp),
	new Sprite(39.5, 53.5, spriteTextures.lamp),
	new Sprite(35.5, 49.5, spriteTextures.lamp),
	new Sprite(35.5, 44.5, spriteTextures.lamp),
	new Food(35.5, 54.5),
	new Food(38.5, 49.5),
	new AmmoBox(41.5, 53.5),
	new Sprite(41.5, 49.5, spriteTextures.bones),
	new Sprite(39.5, 44.5, spriteTextures.skeleton),
	new Food(30.5, 43.5),
	new Sprite(35.5, 40.5, spriteTextures.lamp),
	new Sprite(35.5, 37.5, spriteTextures.lamp),
	new Sprite(35.5, 34.5, spriteTextures.lamp),
	new Sprite(29.5, 43.5, spriteTextures.bones),

	// stone-1
	new Sprite(28.5, 29.5, spriteTextures.brownPlant, true),
	new Sprite(42.5, 29.5, spriteTextures.brownPlant, true),
	new Sprite(28.5, 23.5, spriteTextures.brownPlant, true),
	new Sprite(42.5, 23.5, spriteTextures.brownPlant, true),
	new Sprite(33.5, 22.5, spriteTextures.brownPlant, true),
	new Sprite(37.5, 22.5, spriteTextures.brownPlant, true),
	new Sprite(35.5, 26.5, spriteTextures.chandelier),
	new Sprite(30.5, 26.5, spriteTextures.chandelier),
	new Sprite(40.5, 26.5, spriteTextures.chandelier),

	// blue-2
	new DogFood(59.5, 35.5),
	new Sprite(60.5, 38.5, spriteTextures.brownBowl),
	new Sprite(57.5, 28.5, spriteTextures.table, true),
	new Sprite(60.5, 28.5, spriteTextures.table, true),
	new Sprite(60.5, 22.5, spriteTextures.barrel, true),
	new Sprite(61.5, 22.5, spriteTextures.barrel, true),
	new Sprite(62.5, 22.5, spriteTextures.barrel, true),
	new Food(55.5, 22.5),
	new Food(58.5, 28.5),
	new Food(61.5, 30.5),
	new Sprite(60.5, 31.5, spriteTextures.well, true),
	new Sprite(57.5, 31.5, spriteTextures.wellFull, true),

	// wood-1
	new Sprite(35.5, 19.5, spriteTextures.lamp),
	new Sprite(35.5, 15.5, spriteTextures.lamp),
	new Sprite(35.5, 11.5, spriteTextures.lamp),
	new Sprite(38.5, 15.5, spriteTextures.knight, true),
	new AidKit(30.5, 17.5),
	new AidKit(30.5, 18.5),
	new Rifle(29.5, 18.5),
	new AmmoBox(29.5, 17.5),
	new AmmoBox(29.5, 16.5),

	// wood-2
	new Sprite(35.5, 2.5, spriteTextures.tableChairs, true),
	new Sprite(32.5, 2.5, spriteTextures.tableChairs, true),
	new Sprite(38.5, 2.5, spriteTextures.tableChairs, true),
	new Sprite(35.5, 4.5, spriteTextures.chandelier),
	new Sprite(30.5, 1.5, spriteTextures.blueVase, true),
	new Sprite(40.5, 1.5, spriteTextures.blueVase, true),
	new GoldCup(42.5, 5.5),
	new GoldCup(43.5, 5.5),
	new GoldCup(44.5, 5.5),
	new GoldCup(44.5, 3.5),
	new GoldCross(44.5, 4.5),
	new GoldCross(43.5, 3.5),
	new GoldCross(42.5, 3.5),

	// stone-2
	new Sprite(25.5, 4.5, spriteTextures.lamp),
	new Sprite(19.5, 4.5, spriteTextures.lamp),
	new Sprite(19.5, 10.5, spriteTextures.lamp),

	// stone-3
	new Sprite(10.5, 10.5, spriteTextures.tableChairs, true),
	new Sprite(7.5, 8.5, spriteTextures.standingLamp, true),
	new Sprite(13.5, 8.5, spriteTextures.standingLamp, true),
	new Sprite(7.5, 12.5, spriteTextures.standingLamp, true),
	new Sprite(13.5, 12.5, spriteTextures.standingLamp, true),
	new Sprite(6.5, 10.5, spriteTextures.flag, true),
	new Sprite(11.5, 7.5, spriteTextures.whitePlant, true),
	new Sprite(9.5, 7.5, spriteTextures.whitePlant, true),
	new GoldBox(6.5, 12.5),
	new GoldBox(6.5, 13.5),
	new GoldBox(7.5, 13.5),
	new GoldCup(12.5, 7.5),
	new GoldCup(8.5, 7.5),
	new GoldCross(7.5, 7.5),
	new GoldCross(12.5, 8.5),
	new AmmoBox(6.5, 2.5),
	new AmmoBox(6.5, 3.5),
	new AmmoBox(6.5, 4.5),
	new AmmoBox(6.5, 5.5),
	new AmmoBox(7.5, 2.5),
	new AmmoBox(7.5, 3.5),
	new AmmoBox(7.5, 4.5),
	new AmmoBox(7.5, 5.5),
	new GoldCross(8.5, 2.5),
	new GoldCross(9.5, 2.5),
	new GoldCross(9.5, 3.5),
	new GoldBox(8.5, 3.5),
	new GoldBox(8.5, 4.5),
	new GoldBox(8.5, 5.5),
	new GoldBox(9.5, 4.5),

	// stone-4
	new Sprite(10.5, 16.5, spriteTextures.lamp),
	new Sprite(10.5, 19.5, spriteTextures.lamp),
	new Sprite(7.5, 23.5, spriteTextures.brownPlant, true),
	new Sprite(13.5, 23.5, spriteTextures.brownPlant, true),
	new Sprite(7.5, 29.5, spriteTextures.brownPlant, true),
	new Sprite(13.5, 29.5, spriteTextures.brownPlant, true),
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
	new Sprite(7.5, 34.5, spriteTextures.greenBarrel, true),
	new Food(5.5, 36.5),
	new Food(7.5, 18.5),
	new GoldCup(7.5, 20.5),
	new Sprite(2.5, 14.5, spriteTextures.lamp),
	new AidKit(2.5, 13.5),
	new Sprite(3.5, 13.5, spriteTextures.barrel, true),

	// stone-6
	new AidKit(19.5, 43.5),
	new Face(14.5, 48.5),

];

export {
	sprites,
};
