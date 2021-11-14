import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';

class Face extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	) {
		super(x, y, spriteTextures.face, (player:Player) => {
			player.health = 100;
			player.lives = Math.min(9, player.lives + 1);
			return true;
		});
	}
}

export default Face;
