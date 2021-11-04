interface KeyboardListener {
	key:string,
	callback:() => void,
	type:'press'|'down'|'up',
	pressed:boolean,
}


export default class KeyboardController {
	private attach:HTMLElement;
	private listeners:KeyboardListener[];

	constructor(attach = document.body) {
		this.attach = attach;
		this.listeners = [];
		this.setup();
	}

	setup() {
		this.attach.tabIndex = 0;
		this.attach.focus();
		window.requestAnimationFrame(() => {
			this.attach.focus();
		});
		this.attach.addEventListener('keydown', (e) => {
			e.preventDefault();
			this.listeners
				.filter(l => l.type === 'press')
				.filter(l => l.key === e.key.toLowerCase())
				.forEach(listener => {
					listener.callback();
				});
			this.listeners
				.filter(l => l.type === 'down')
				.filter(l => !l.pressed)
				.filter(l => l.key === e.key.toLowerCase())
				.forEach(listener => {
					listener.pressed = true;
					listener.callback();
				});
		});
		this.attach.addEventListener('keyup', (e) => {
			e.preventDefault();
			this.listeners
				.filter(l => l.type === 'up')
				.filter(l => l.key === e.key.toLowerCase())
				.forEach(listener => {
					listener.callback();
				});
			this.listeners
				.filter(l => l.type === 'down')
				.filter(l => l.pressed)
				.filter(l => l.key === e.key.toLowerCase())
				.forEach(listener => {
					listener.pressed = false;
				});
		});
	}

	addListener(key:string, type:'press'|'down'|'up' = 'down', callback:() => void = () => {return;}) {
		this.listeners.push({
			key,
			callback,
			type,
			pressed: false
		});
	}

	clearListeners() {
		this.listeners = [];
	}

	focus() {
		this.attach.focus();
	}
}
