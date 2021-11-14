class AnimationClock {
	private started = Date.now();
	private last:number;

	constructor() {
		this.last = this.started;
	}

	getDelta():number {
		const now = Date.now();
		const delta = now - this.last;
		this.last = now;
		return delta / 1000;
	}
}

export default AnimationClock;
