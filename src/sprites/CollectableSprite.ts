import Sprite, {SpriteType} from '@src/Sprite';
import SpriteTexture, {spriteTextures} from '@src/SpriteTexture';
import Player from '@src/Player';

abstract class CollectableSprite extends Sprite {
	protected constructor(
		public x:number,
		public y:number,
		public texture:SpriteTexture = spriteTextures.debug,
		public callback:(player:Player)=>boolean = ()=>{return true;}
	) {
		super(x, y, texture, false, SpriteType.Normal);
	}

	collect(player:Player){
		if(this.callback(player)){
			this.x = -2000;
			this.y = -2000;
		}
	}
}


export default CollectableSprite;
