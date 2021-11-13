import CollectableSprite from '@src/sprites/CollectableSprite';
import {spriteTextures} from '@src/SpriteTexture';
import Player from '@src/Player';

class GoldCross extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	){
		super(x,y,spriteTextures.goldCross, (player:Player) => {
			player.score += 100;
			return true;
		});
	}
}

export default GoldCross;
