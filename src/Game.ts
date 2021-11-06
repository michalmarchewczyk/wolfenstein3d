import Tile from '@src/Tile';
import RendererPreview from '@src/RendererPreview';
import KeyboardController from '@src/utils/KeyboardController';
import Player from '@src/Player';
import AnimationClock from '@src/utils/AnimationClock';
import Renderer from '@src/Renderer';
import TileType, {tileTypes} from '@src/TileType';
import Sprite from '@src/Sprite';
import map from './maps/map1.json';
import Entity from '@src/Entity';
import {sprites, entities} from '@src/maps/map1';


class Game {
	public map:Tile[][] = [];
	public sprites:Sprite[] = [];
	private mapSize = 64;
	private renderer: Renderer;
	private rendererPreview:RendererPreview;
	private tiles:Tile[] = [];
	private readonly player:Player;
	private readonly element:HTMLDivElement;
	private keyboardController:KeyboardController = new KeyboardController();
	private animationClock:AnimationClock;
	private entities:Entity[] = [];

	constructor(){
		this.player = new Player(30.5, 49.5, 0, (x,y) => {
			const foundTile = this.tiles
				.filter(t => t.x === Math.floor(x) && t.y === Math.floor(y))
				.find(t => t.type.opaque);
			const foundEntity = this.entities
				.filter(e => Math.floor(e.x) === Math.floor(x) && Math.floor(e.y) === Math.floor(y))
				.find(e => e.collision);
			const foundSprite = this.sprites
				.filter(s => Math.floor(s.x) === Math.floor(x) && Math.floor(s.y) === Math.floor(y))
				.find(s => s.collision);
			return (foundTile !== undefined || foundEntity !== undefined || foundSprite !== undefined);
		});
		this.initMap();
		this.element = document.createElement('div');
		this.renderer = new Renderer(this.map, this.tiles, this.player, this.sprites, this.entities);
		this.rendererPreview = new RendererPreview(this.map, this.tiles, this.player, this.sprites, this.entities);
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
				type = Object.values(tileTypes).find(t => t?.xImg === loaded?.type?.xImg && t?.yImg === loaded?.type?.yImg && t?.opaque === loaded?.type?.opaque) ?? type;
				newTile.type = type;
			}
		}

		this.sprites = sprites;
		this.entities = entities;
	}

	tick(){
		const delta = this.animationClock.getDelta();

		this.player.tick(delta);
		this.entities.forEach(entity => {
			entity.tick(delta);
		});

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	initControls() {
		this.keyboardController.clearListeners();
		this.keyboardController.addListener('w', 'down', () => {
			this.player.speed = 6;
		});
		this.keyboardController.addListener('w', 'up', () => {
			this.player.speed = 0;
		});
		this.keyboardController.addListener('s', 'down', () => {
			this.player.speed = -6;
		});
		this.keyboardController.addListener('s', 'up', () => {
			this.player.speed = 0;
		});
		this.keyboardController.addListener('a', 'down', () => {
			this.player.rotationSpeed = -3;
		});
		this.keyboardController.addListener('a', 'up', () => {
			this.player.rotationSpeed = 0;
		});
		this.keyboardController.addListener('d', 'down', () => {
			this.player.rotationSpeed = 3;
		});
		this.keyboardController.addListener('d', 'up', () => {
			this.player.rotationSpeed = 0;
		});
		this.keyboardController.addListener('shift', 'down', () => {
			this.player.speedMultiplier = 2;
		});
		this.keyboardController.addListener('shift', 'up', () => {
			this.player.speedMultiplier = 1;
		});
		this.keyboardController.addListener(' ', 'down', () => {
			const nearestEntity = this.entities.filter(e => {
				const dist = Math.sqrt((this.player.x-e.x)*(this.player.x-e.x)+(this.player.y-e.y)*(this.player.y-e.y));
				return dist < 1.2;
			}).sort((a,b) => {
				const distA = Math.sqrt((this.player.x-a.x)*(this.player.x-a.x)+(this.player.y-a.y)*(this.player.y-a.y));
				const distB = Math.sqrt((this.player.x-b.x)*(this.player.x-b.x)+(this.player.y-b.y)*(this.player.y-b.y));
				return distA - distB;
			})[0];
			nearestEntity?.activate();
		});
		this.keyboardController.focus();
	}

	render():HTMLDivElement {
		return this.element;
	}
}

export default Game;
