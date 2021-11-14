import hudTexture from '../assets/hud.png';

class Counter {
	private _number = 0;
	private readonly element:HTMLDivElement;

	constructor(number:number, public length:number = 1) {
		this.element = document.createElement('div');
		this.element.classList.add('counter');
		this.element.style.width = this.length * 8 * 2 + 'px';

		this.number = number;

	}

	set number(number:number) {
		this._number = number;
		this.draw();
	}

	get number():number {
		return this._number;
	}

	draw() {
		this.element.innerHTML = '';
		const string = this._number.toString().padStart(this.length, ' ');
		for (let i = 0; i < this.length; i++) {
			const digitEl = document.createElement('div');
			digitEl.classList.add('counterDigit');
			digitEl.style.left = (i * 16) + 'px';
			digitEl.style.backgroundImage = `url(${hudTexture})`;
			digitEl.style.backgroundSize = '640px 262px';
			digitEl.style.backgroundPosition = `${-219 * 2}px ${-41 * 2}px`;
			this.element.appendChild(digitEl);
			if (string[i] === ' ') {
				digitEl.style.backgroundPosition = `${-219 * 2}px ${-41 * 2}px`;
			} else {
				digitEl.style.backgroundPosition = `${(-228 + parseInt(string[i]) * -9) * 2}px ${-41 * 2}px`;
			}
		}

	}

	render():HTMLDivElement {
		return this.element;
	}
}

export default Counter;
