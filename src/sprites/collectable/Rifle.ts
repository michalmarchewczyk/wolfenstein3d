import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';
import {weapons} from '@src/Weapon';

class Rifle extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	) {
		super(x, y, spriteTextures.rifle, (player:Player) => {
			player.weapon = weapons[2];
			player.hiddenWeapon = weapons[2];
			return true;
		});
	}
}

export default Rifle;
