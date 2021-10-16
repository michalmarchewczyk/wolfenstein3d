

class Renderer {
	private element:HTMLDivElement;

	constructor(){
		this.element = document.createElement('div');

	}


	render():HTMLDivElement {
		return this.element;
	}
}

export default Renderer;
