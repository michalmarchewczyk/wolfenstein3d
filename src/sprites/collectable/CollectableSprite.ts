import Sprite, {SpriteType} from '@src/sprites/Sprite';
import SpriteTexture, {spriteTextures} from '@src/sprites/SpriteTexture';
import Player from '@src/Player';

abstract class CollectableSprite extends Sprite {
	protected constructor(
		public x:number,
		public y:number,
		public texture:SpriteTexture = spriteTextures.debug,
		public callback:(player:Player) => boolean = () => {
			return true;
		}
	) {
		super(x, y, texture, false, SpriteType.Normal);
	}

	collect(player:Player):boolean {
		if (this.callback(player)) {
			this.x = this.x - 2000;
			this.y = this.y - 2000;
			return true;
		}
		return false;
	}
}


export default CollectableSprite;
