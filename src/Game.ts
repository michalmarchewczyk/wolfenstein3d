import Tile from '@src/Tile';
import RendererPreview from '@src/RendererPreview';
import KeyboardController from '@src/utils/KeyboardController';
import Player from '@src/Player';
import AnimationClock from '@src/utils/AnimationClock';
import Renderer from '@src/Renderer';
import TileType, {tileTypes} from '@src/TileType';
import Sprite from '@src/sprites/Sprite';
import map from './maps/map1/tiles.json';
import Entity from '@src/entities/Entity';
import {sprites} from '@src/maps/map1/sprites';
import {entities} from '@src/maps/map1/entities';
import HUD from '@src/HUD/HUD';
import CollectableSprite from '@src/sprites/collectable/CollectableSprite';
import {calcDist} from '@src/utils/math/distance';
import Guard from '@src/entities/Guard';
import Raycaster from '@src/utils/math/Raycaster';
import AmmoBox from '@src/sprites/collectable/AmmoBox';
import WinSprite from '@src/sprites/collectable/WinSprite';


class Game {
	public map:Tile[][] = [];
	public sprites:Sprite[] = [];
	private mapSize = 64;
	private renderer:Renderer;
	private rendererPreview:RendererPreview;
	private hud:HUD;
	private tiles:Tile[] = [];
	private player:Player;
	private readonly element:HTMLDivElement;
	private keyboardController:KeyboardController = new KeyboardController();
	private animationClock:AnimationClock;
	private entities:Entity[] = [];
	private level = 1;
	private raycaster:Raycaster;
	private lastPlayerHealth = 100;

	constructor(
		public onDead:() => void,
		public onWin:(score:number, time:number, killRatio:number, secretRatio:number, treasureRatio:number)=>void
	) {
		this.player = new Player(30.5, 49.5, 0, (x, y) => {
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
		this.hud = new HUD();
		this.element.appendChild(this.renderer.render());
		this.element.appendChild(this.hud.render());
		this.element.classList.add('game');
		// this.initControls();

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type.opaque || !!this.entities.find(e => Math.floor(e.x) === x && Math.floor(e.y) === y)?.collision;
		});

		this.animationClock = new AnimationClock();
		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	private initMap():void {
		for (let x = 0; x < this.mapSize; x++) {
			this.map[x] = [];
			for (let y = 0; y < this.mapSize; y++) {
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

	tick() {
		const delta = this.animationClock.getDelta();

		this.player.tick(delta);
		if(this.lastPlayerHealth > this.player.health){
			this.hud.flashRed();
		}
		this.lastPlayerHealth = this.player.health;

		this.entities.forEach(entity => {
			entity.tick(delta);
			if(entity instanceof Guard){
				const dead = entity.tickEnemy(delta, this.player, this.raycaster);
				if(dead){
					this.sprites.push(new AmmoBox(entity.x, entity.y));
				}
			}
		});

		this.sprites.forEach(sprite => {
			if (sprite instanceof CollectableSprite) {
				const dist = calcDist(this.player.x, this.player.y, sprite.x, sprite.y);
				if (dist <= 1) {
					const collected = sprite.collect(this.player);
					if(collected) {
						this.hud.flash();
						if(sprite instanceof WinSprite){
							this.restart(4);
							this.keyboardController.clearListeners();
							this.onWin(this.player.score, 100, 1, 1, 1);
						}
					}
				}
			}
		});

		this.hud.draw(delta, this.player, this.level);

		if(this.player.health <= 0){
			this.player.health = 0;
			if(this.player.lives > 1){
				this.hud.flashDead();
				this.restart(this.player.lives);
			}else{
				this.hud.flashDead();
				this.restart(4);
				this.keyboardController.clearListeners();
				this.onDead();
			}
		}

		this.renderer.draw();

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
			const nearestEntity = this.entities
				.filter(e => calcDist(this.player.x, this.player.y, e.x, e.y) < 1.2)
				.sort((a, b) => {
					const distA = calcDist(this.player.x, this.player.y, a.x, a.y);
					const distB = calcDist(this.player.x, this.player.y, b.x, b.y);
					return distA - distB;
				})[0];
			nearestEntity?.activate();
		});
		this.keyboardController.addListener('e', 'down', () => {
			this.player.firing = true;
			this.player.fire();
		});
		this.keyboardController.addListener('e', 'up', () => {
			this.player.firing = false;
		});
		this.keyboardController.focus();
	}

	async restart(lives:number){

		while(this.element.firstChild){
			this.element.removeChild(this.element.firstChild);
		}

		this.player = new Player(30.5, 49.5, 0, (x, y) => {
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

		this.player.lives = lives - 1;

		this.sprites.forEach(sprite => {
			if(sprite.x < 0){
				sprite.x += 2000;
				sprite.y += 2000;
			}
		});

		this.entities.forEach(entity => {
			if(entity instanceof Guard){
				entity.health = 30;
				if(entity.dead){
					entity.dead = false;
					entity.collision = true;
				}
			}
		});

		this.renderer = new Renderer(this.map, this.tiles, this.player, this.sprites, this.entities);
		this.hud = new HUD();
		this.element.appendChild(this.renderer.render());
		this.element.appendChild(this.hud.render());

		this.rendererPreview.player = this.player;

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type.opaque || !!this.entities.find(e => Math.floor(e.x) === x && Math.floor(e.y) === y)?.collision;
		});


		this.initControls();

	}


	setDifficulty(diff:number):void {
		this.entities.forEach(entity => {
			if(entity instanceof Guard){
				entity.health = 30 + diff * 15; // 30, 45, 60, 75
			}
		});
	}

	render():HTMLDivElement[] {
		return [this.element, this.rendererPreview.render()];
	}
}

export default Game;
