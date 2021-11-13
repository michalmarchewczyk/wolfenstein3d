import CollectableSprite from '@src/sprites/CollectableSprite';
import {spriteTextures} from '@src/SpriteTexture';
import Player from '@src/Player';

class DogFood extends CollectableSprite {
	constructor(
		public x:number,
		public y:number,
	){
		super(x,y,spriteTextures.dogFood, (player:Player) => {
			if(player.health < 100){
				player.health += 4;
				player.health = Math.min(100, player.health);
				return true;
			}
			return false;
		});
	}
}

export default DogFood;
