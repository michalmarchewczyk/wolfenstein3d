import hudTexture from './assets/hud.png';
import weaponTexture from './assets/weapons.png';
import HUDFace from '@src/HUDFace';
import Player from '@src/Player';
import Counter from '@src/Counter';
import Weapon, {weapons} from '@src/Weapon';

class HUD {
	private readonly element:HTMLDivElement;
	private readonly stats:HTMLDivElement;
	private face:HUDFace;
	private levelCounter:Counter;
	private scoreCounter:Counter;
	private livesCounter:Counter;
	private healthCounter:Counter;
	private ammoCounter:Counter;
	private displayedWeapon:Weapon = weapons[0];
	private readonly weaponThumbnail:HTMLDivElement;
	private readonly weaponImage:HTMLDivElement;

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


		this.weaponThumbnail = document.createElement('div');
		this.weaponThumbnail.classList.add('hudWeaponThumbnail');
		this.stats.appendChild(this.weaponThumbnail);
		this.weaponThumbnail.style.backgroundImage = `url(${hudTexture})`;
		this.weaponThumbnail.style.backgroundPosition = `${this.displayedWeapon.xTex * -2}px ${41 * -2}px`;

		this.weaponImage = document.createElement('div');
		this.weaponImage.classList.add('hudWeaponImage');
		this.element.appendChild(this.weaponImage);
		this.weaponImage.style.backgroundImage = `url(${weaponTexture})`;
		this.weaponImage.style.backgroundPosition = `${0}px ${this.displayedWeapon.yTex * -2}px`;

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
		if(this.displayedWeapon !== player.weapon){
			this.displayedWeapon = player.weapon;
			this.weaponThumbnail.style.backgroundPosition = `${this.displayedWeapon.xTex * -2}px ${41 * -2}px`;
			this.weaponImage.style.backgroundPosition = `${0}px ${this.displayedWeapon.yTex * -4}px`;
		}
		const currentTime = Date.now()/1000;
		if(currentTime - player.lastFire < player.weapon.delay+0.2){
			const frame = (currentTime - player.lastFire)/player.weapon.delay;
			if(frame < 0.15){
				this.weaponImage.style.backgroundPosition = `${65 * -4}px ${this.displayedWeapon.yTex * -4}px`;
			}else if(frame < 0.3){
				this.weaponImage.style.backgroundPosition = `${130 * -4}px ${this.displayedWeapon.yTex * -4}px`;
			}else if(frame < 0.55){
				this.weaponImage.style.backgroundPosition = `${195 * -4}px ${this.displayedWeapon.yTex * -4}px`;
			}else if(frame < 0.7){
				this.weaponImage.style.backgroundPosition = `${260 * -4}px ${this.displayedWeapon.yTex * -4}px`;
			}else{
				this.weaponImage.style.backgroundPosition = `${0}px ${this.displayedWeapon.yTex * -4}px`;
			}
		}
	}


	render():HTMLDivElement {
		return this.element;
	}

}


export default HUD;
