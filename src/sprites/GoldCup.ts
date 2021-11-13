import CollectableSprite from '@src/sprites/CollectableSprite';
import {spriteTextures} from '@src/SpriteTexture';
import Player from '@src/Player';

class GoldCup extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	){
		super(x,y,spriteTextures.goldCup, (player:Player) => {
			player.score += 500;
			return true;
		});
	}
}

export default GoldCup;
