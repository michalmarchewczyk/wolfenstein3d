import CollectableSprite from '@src/sprites/CollectableSprite';
import {spriteTextures} from '@src/SpriteTexture';
import Player from '@src/Player';

class GoldBox extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	){
		super(x,y,spriteTextures.goldBox, (player:Player) => {
			player.score += 1000;
			return true;
		});
	}
}

export default GoldBox;
