import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';

class AmmoBox extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	) {
		super(x, y, spriteTextures.ammoBox, (player:Player) => {
			const ammo = Math.floor(Math.random() * 2) * 4 + 4;
			if (player.ammo < 99) {
				player.ammo += ammo;
				player.ammo = Math.min(99, player.ammo);
				return true;
			}
			return false;
		});
	}
}

export default AmmoBox;
