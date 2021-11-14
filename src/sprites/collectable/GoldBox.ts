import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';

class GoldBox extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	) {
		super(x, y, spriteTextures.goldBox, (player:Player) => {
			player.score += 1000;
			return true;
		});
	}
}

export default GoldBox;
