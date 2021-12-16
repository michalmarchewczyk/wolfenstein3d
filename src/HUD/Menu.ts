import menu1 from '@src/assets/menu/menu1.png';
import menu2 from '@src/assets/menu/menu2.png';
import menu3 from '@src/assets/menu/menu3.png';
import menu41 from '@src/assets/menu/menu4-1.png';
import menu42 from '@src/assets/menu/menu4-2.png';
import menu43 from '@src/assets/menu/menu4-3.png';
import menu44 from '@src/assets/menu/menu4-4.png';
import menu45 from '@src/assets/menu/menu4-5.png';
import menu46 from '@src/assets/menu/menu4-6.png';
import menu47 from '@src/assets/menu/menu4-7.png';
import menu48 from '@src/assets/menu/menu4-8.png';
import menu51 from '@src/assets/menu/menu5-1.png';
import menu52 from '@src/assets/menu/menu5-2.png';
import menu53 from '@src/assets/menu/menu5-3.png';
import menu54 from '@src/assets/menu/menu5-4.png';
import {delay} from '@src/utils/delay';
import KeyboardController from '@src/utils/KeyboardController';

class Menu {
	private readonly element:HTMLDivElement;
	private readonly overlay:HTMLImageElement;
	private readonly keyboardController:KeyboardController;

	constructor(public onStart:(diff:number) => void) {
		this.element = document.createElement('div');
		this.element.classList.add('menu');
		this.overlay = document.createElement('img');
		this.overlay.classList.add('menuOverlay');

		this.element.appendChild(this.overlay);

		this.keyboardController = new KeyboardController(this.element);
		this.keyboardController.clearListeners();
		this.keyboardController.focus();

		this.start();
	}

	async start(){
		this.overlay.src = menu1;
		await delay(400);
		this.overlay.classList.add('menuOverlayOn');
		await delay(2400);
		this.overlay.classList.remove('menuOverlayOn');
		await delay(800);

		this.overlay.src = menu2;
		await delay(400);
		this.overlay.classList.add('menuOverlayOn');
		await delay(2400);
		this.overlay.classList.remove('menuOverlayOn');
		await delay(800);

		this.overlay.src = menu3;
		await delay(400);
		this.overlay.classList.add('menuOverlayOn');
		await delay(2400);
		this.overlay.classList.remove('menuOverlayOn');
		await delay(800);

		await this.showMenu();
	}

	async showMenu() {
		console.log('showMenu');
		this.element.classList.remove('menuOff');
		await delay(400);
		this.overlay.classList.add('menuOverlayOn');
		let selected = 0;
		this.refreshMenu(selected+1);
		this.keyboardController.clearListeners();
		this.keyboardController.addListener('arrowdown', 'down', async () => {
			selected = (selected + 1) % 8;
			await this.refreshMenu(selected+1);
		});
		this.keyboardController.addListener('s', 'down', async () => {
			selected = (selected + 1) % 8;
			await this.refreshMenu(selected+1);
		});
		this.keyboardController.addListener('arrowup', 'down', async () => {
			selected = (selected + 7) % 8;
			await this.refreshMenu(selected+1);
		});
		this.keyboardController.addListener('w', 'down', async () => {
			selected = (selected + 7) % 8;
			await this.refreshMenu(selected+1);
		});
		this.keyboardController.addListener('enter', 'down', async () => {
			this.overlay.classList.remove('menuOverlayOn');
			await delay(800);
			await this.showDiff();
		});
		this.keyboardController.focus();
		console.log('after show Menu');
	}


	private refreshMenu(selected:number) {
		if (selected === 1) {
			this.overlay.src = menu41;
		} else if (selected === 2) {
			this.overlay.src = menu42;
		} else if (selected === 3) {
			this.overlay.src = menu43;
		} else if (selected === 4) {
			this.overlay.src = menu44;
		} else if (selected === 5) {
			this.overlay.src = menu45;
		} else if (selected === 6) {
			this.overlay.src = menu46;
		} else if (selected === 7) {
			this.overlay.src = menu47;
		} else if (selected === 8) {
			this.overlay.src = menu48;
		}
	}


	async showDiff() {
		await delay(400);
		this.overlay.classList.add('menuOverlayOn');
		let selected = 0;
		this.refreshDiff(selected+1);
		this.keyboardController.clearListeners();
		this.keyboardController.addListener('arrowdown', 'down', async () => {
			selected = (selected + 1) % 4;
			await this.refreshDiff(selected+1);
		});
		this.keyboardController.addListener('s', 'down', async () => {
			selected = (selected + 1) % 4;
			await this.refreshDiff(selected+1);
		});
		this.keyboardController.addListener('arrowup', 'down', async () => {
			selected = (selected + 3) % 4;
			await this.refreshDiff(selected+1);
		});
		this.keyboardController.addListener('w', 'down', async () => {
			selected = (selected + 3) % 4;
			await this.refreshDiff(selected+1);
		});
		this.keyboardController.addListener('enter', 'down', async () => {
			console.log('enter', selected);
			this.overlay.classList.remove('menuOverlayOn');
			await delay(800);
			this.element.classList.add('menuOff');
			this.onStart(selected);
		});
		this.keyboardController.focus();
	}

	private refreshDiff(selected:number) {
		if (selected === 1) {
			this.overlay.src = menu51;
		} else if (selected === 2) {
			this.overlay.src = menu52;
		} else if (selected === 3) {
			this.overlay.src = menu53;
		} else if (selected === 4) {
			this.overlay.src = menu54;
		}
	}

	render():HTMLDivElement {
		return this.element;
	}
}


export default Menu;
