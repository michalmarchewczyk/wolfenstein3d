import hudTexture from './assets/hud.png';
import HUDFace from '@src/HUDFace';
import Player from '@src/Player';
import Counter from '@src/Counter';

class HUD {
	private readonly element:HTMLDivElement;
	private readonly stats:HTMLDivElement;
	private face:HUDFace;
	private levelCounter:Counter;
	private scoreCounter:Counter;
	private livesCounter:Counter;
	private healthCounter:Counter;
	private ammoCounter:Counter;

	constructor(){
		this.element = document.createElement('div');
		this.element.classList.add('hud');

		this.stats = document.createElement('div');
		this.stats.classList.add('hudStats');
		this.element.appendChild(this.stats);
		this.stats.style.backgroundImage = `url(${hudTexture})`;

		this.face = new HUDFace();
		this.stats.appendChild(this.face.render());

		this.levelCounter = new Counter(0, 1);
		const levelCounterEl = this.levelCounter.render();
		levelCounterEl.style.left = '44px';
		levelCounterEl.style.top = '32px';
		this.stats.appendChild(levelCounterEl);

		this.scoreCounter = new Counter(0, 5);
		const scoreCounterEl = this.scoreCounter.render();
		scoreCounterEl.style.left = '108px';
		scoreCounterEl.style.top = '32px';
		this.stats.appendChild(scoreCounterEl);

		this.livesCounter = new Counter(0, 1);
		const livesCounterEl = this.livesCounter.render();
		livesCounterEl.style.left = '226px';
		livesCounterEl.style.top = '32px';
		this.stats.appendChild(livesCounterEl);


		this.healthCounter = new Counter(0, 3);
		const healthCounterEl = this.healthCounter.render();
		healthCounterEl.style.left = '332px';
		healthCounterEl.style.top = '32px';
		this.stats.appendChild(healthCounterEl);


		this.ammoCounter = new Counter(0, 2);
		const ammoCounterEl = this.ammoCounter.render();
		ammoCounterEl.style.left = '440px';
		ammoCounterEl.style.top = '32px';
		this.stats.appendChild(ammoCounterEl);



	}

	draw(delta:number, player:Player, level:number){
		this.face.draw(delta, player.health);
		if(this.levelCounter.number !== level){
			this.levelCounter.number = level;
		}
		if(this.scoreCounter.number !== player.score){
			this.scoreCounter.number = player.score;
		}
		if(this.livesCounter.number !== player.lives){
			this.livesCounter.number = player.lives;
		}
		if(this.healthCounter.number !== player.health){
			this.healthCounter.number = player.health;
		}
		if(this.ammoCounter.number !== player.ammo){
			this.ammoCounter.number = player.ammo;
		}
	}


	render():HTMLDivElement {
		return this.element;
	}

}


export default HUD;
