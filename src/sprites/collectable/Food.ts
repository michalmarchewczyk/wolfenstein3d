import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';

class Food extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	) {
		super(x, y, spriteTextures.chicken, (player:Player) => {
			if (player.health < 100) {
				player.health += 10;
				player.health = Math.min(100, player.health);
				return true;
			}
			return false;
		});
	}
}

export default Food;
