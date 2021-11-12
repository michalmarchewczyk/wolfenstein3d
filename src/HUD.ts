import hudTexture from './assets/hud.png';
import HUDFace from '@src/HUDFace';
import Player from '@src/Player';

class HUD {
	public element:HTMLDivElement;
	private stats:HTMLDivElement;
	private face:HUDFace;

	constructor(){
		this.element = document.createElement('div');
		this.element.classList.add('hud');

		this.stats = document.createElement('div');
		this.stats.classList.add('hudStats');
		this.element.appendChild(this.stats);
		this.stats.style.backgroundImage = `url(${hudTexture})`;

		this.face = new HUDFace();
		this.stats.appendChild(this.face.render());

	}

	draw(delta:number, player:Player){
		this.face.draw(delta, player.health);
	}


	render():HTMLDivElement {
		return this.element;
	}

}


export default HUD;
