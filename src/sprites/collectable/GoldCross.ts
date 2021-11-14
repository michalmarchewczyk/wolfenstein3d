import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';

class GoldCross extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	) {
		super(x, y, spriteTextures.goldCross, (player:Player) => {
			player.score += 100;
			return true;
		});
	}
}

export default GoldCross;
