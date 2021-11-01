import Tile from '@src/Tile';
import RendererPreview from '@src/RendererPreview';
import KeyboardController from '@src/KeyboardController';
import Player from '@src/Player';
import AnimationClock from '@src/AnimationClock';
import Renderer from '@src/Renderer';
import TileType, {tileTypes} from '@src/TileType';
import Sprite from '@src/Sprite';
import map from './maps/test1.json';


class Game {
	public map:Tile[][] = [];
	public sprites:Sprite[] = [];
	private mapSize = 64;
	private renderer: Renderer;
	private rendererPreview:RendererPreview;
	private tiles:Tile[] = [];
	private player:Player;
	private element:HTMLDivElement;
	private keyboardController:KeyboardController = new KeyboardController();
	private animationClock:AnimationClock;

	constructor(){
		this.player = new Player(5.5, 5.5, 0, (x,y) => {
			return !!this.tiles
				.filter(t => t.x === Math.floor(x) && t.y === Math.floor(y))
				.find(t => t.type.opaque);
		});
		this.initMap();
		this.element = document.createElement('div');
		this.renderer = new Renderer(this.map, this.tiles, this.player, this.sprites);
		this.rendererPreview = new RendererPreview(this.map, this.tiles, this.player, this.sprites);
		this.element.appendChild(this.rendererPreview.render());
		this.element.appendChild(this.renderer.render());
		this.initControls();

		this.animationClock = new AnimationClock();
		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	private initMap():void {
		for(let x = 0; x < this.mapSize; x++){
			this.map[x] = [];
			for(let y = 0; y < this.mapSize; y++){
				const newTile:Tile = new Tile(x, y);
				this.map[x][y] = newTile;
				this.tiles.push(newTile);
				const loaded = map[x]?.[y];
				let type:TileType = tileTypes.null;
				type = Object.values(tileTypes).find(type => type?.xImg === loaded?.type?.xImg && type?.yImg === loaded?.type?.yImg) ?? type;
				newTile.type = type;
			}
		}
	}

	tick(){
		const delta = this.animationClock.getDelta();

		this.player.tick(delta);

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	initControls() {
		this.keyboardController.addListener('w', 'down', () => {
			this.player.speed = 4;
		});
		this.keyboardController.addListener('w', 'up', () => {
			this.player.speed = 0;
		});
		this.keyboardController.addListener('s', 'down', () => {
			this.player.speed = -4;
		});
		this.keyboardController.addListener('s', 'up', () => {
			this.player.speed = 0;
		});
		this.keyboardController.addListener('a', 'down', () => {
			this.player.rotationSpeed = -2;
		});
		this.keyboardController.addListener('a', 'up', () => {
			this.player.rotationSpeed = 0;
		});
		this.keyboardController.addListener('d', 'down', () => {
			this.player.rotationSpeed = 2;
		});
		this.keyboardController.addListener('d', 'up', () => {
			this.player.rotationSpeed = 0;
		});
	}

	render():HTMLDivElement {
		return this.element;
	}
}

export default Game;
