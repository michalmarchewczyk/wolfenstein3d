import CollectableSprite from '@src/sprites/CollectableSprite';
import {spriteTextures} from '@src/SpriteTexture';
import Player from '@src/Player';
import {weapons} from '@src/Weapon';

class Rifle extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	){
		super(x,y,spriteTextures.rifle, (player:Player) => {
			player.weapon = weapons[2];
			return true;
		});
	}
}

export default Rifle;
