import faceTexture from '../assets/face.png';

class HUDFace {
	public element:HTMLDivElement;
	private timer = 0;
	private nextTime = 0;

	constructor() {
		this.element = document.createElement('div');
		this.element.classList.add('hudFace');
		this.element.style.backgroundImage = `url(${faceTexture})`;
		this.element.style.backgroundSize = '640px 928px';
	}

	draw(delta:number, playerHealth:number) {
		this.timer += delta;

		if (this.timer >= this.nextTime) {
			this.timer = 0;
			this.nextTime = Math.random() * 1.2 + 0.2;
			this.drawFace(playerHealth);
		}
	}

	drawFace(playerHealth:number) {
		let yTex:number;
		if (playerHealth >= 85) {
			yTex = -2;
		} else if (playerHealth >= 70) {
			yTex = -68;
		} else if (playerHealth >= 55) {
			yTex = -134;
		} else if (playerHealth >= 40) {
			yTex = -200;
		} else if (playerHealth >= 25) {
			yTex = -266;
		} else if (playerHealth >= 10) {
			yTex = -332;
		} else {
			yTex = -398;
		}
		this.element.style.backgroundPosition = `${-2 * Math.floor(Math.random() * 3) * 25}px ${yTex}px`;

	}


	render():HTMLDivElement {
		return this.element;
	}
}

export default HUDFace;
