import Tile from '@src/Tile';
import Player from '@src/Player';
import Vector from '@src/Vector';
import Raycaster from '@src/Raycaster';
import {tileTexture, tileTypes} from '@src/TileType';
import Sprite from '@src/Sprite';
import {spriteTexture} from '@src/SpriteTexture';

const PREVIEW_SIZE = 1000;

class RendererPreview {
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private tileSize:number;
	private raycaster:Raycaster;
	private tileSelector = document.createElement('div');
	private selectedIndex = 0;

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player, private sprites:Sprite[]){
		this.ctx = this.canvas.getContext('2d')!;
		this.canvas.width = PREVIEW_SIZE;
		this.canvas.height = PREVIEW_SIZE;
		this.tileSize = PREVIEW_SIZE / this.map.length;
		this.tileSelector.classList.add('tileSelector');

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type.opaque;
		});

		this.canvas.onclick = (e) => {
			this.click(e);
		};

		this.drawSelector();

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	draw():void{
		this.ctx.fillStyle = '#aaaaaa';
		this.ctx.fillRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);
		this.drawTiles();
		this.drawPlayer();

		for(let i = -0.7; i <= 0.7; i += 0.007){
			const offset = Math.atan(i/0.9);
			this.raycast(new Vector(
				Math.cos(this.player.dir+offset),
				Math.sin(this.player.dir+offset)
			));
		}

		this.sprites.forEach(sprite => {
			this.ctx.drawImage(spriteTexture, sprite.texture.xImg, sprite.texture.yImg, 128, 128,
				(sprite.x-0.5) * this.tileSize, (sprite.y-0.5)*this.tileSize, this.tileSize, this.tileSize);
		});

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	drawSelector() {
		this.tileSelector.innerHTML = '';

		Object.values(tileTypes).forEach((type,i) => {
			const el = document.createElement('div');
			if(type.opaque){
				el.style.backgroundImage = `url(${tileTexture.src})`;
				el.style.backgroundSize = '240px 760px';
				el.style.backgroundRepeat = 'no-repeat';
				el.style.backgroundPosition = `${type.xImg / 64 * 40 * -1}px ${type.yImg / 64 * 40 * -1}px`;
			}
			el.onclick = () => {
				this.selectedIndex = i;
			};
			this.tileSelector.appendChild(el);
		});

		const saveButton = document.createElement('button');
		this.tileSelector.appendChild(saveButton);
		saveButton.innerText = 'SAVE';
		saveButton.onclick = async () => {
			await navigator.clipboard.writeText(JSON.stringify(this.map, null, 4));
			alert('Map JSON copied to clipboard');
		};
	}

	raycast(vRayDir:Vector):void {

		const vRayStart = new Vector(this.player.x, this.player.y);

		const {found, vIntersection} = this.raycaster.raycast(vRayDir, vRayStart);

		if(found){
			this.ctx.beginPath();
			this.ctx.fillStyle = '#3bff00';
			this.ctx.strokeStyle = '#b7f1a6';
			this.ctx.arc(
				vIntersection.x * this.tileSize,
				vIntersection.y * this.tileSize,
				2, 0, 2 * Math.PI
			);
			this.ctx.moveTo(
				this.player.x * this.tileSize,
				this.player.y * this.tileSize
			);
			this.ctx.lineTo(
				vIntersection.x * this.tileSize,
				vIntersection.y * this.tileSize
			);
			this.ctx.fill();
			this.ctx.stroke();
		}else{
			this.ctx.beginPath();
			this.ctx.fillStyle = '#3bff00';
			this.ctx.strokeStyle = '#b7f1a6';
			this.ctx.moveTo(
				this.player.x * this.tileSize,
				this.player.y * this.tileSize
			);
			this.ctx.lineTo(
				vRayDir.multiply(20).add(vRayStart).x * this.tileSize,
				vRayDir.multiply(20).add(vRayStart).y * this.tileSize,
			);
			this.ctx.fill();
			this.ctx.stroke();
		}

	}

	private drawTiles() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = '#dddddd';

		this.tiles.forEach(tile => {
			this.ctx.fillStyle = '#aaaaaa';
			if (tile.type.opaque) {
				this.ctx.fillStyle = '#134ac2';
			}
			this.ctx.fillRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
			if(tile.type.opaque){
				this.ctx.drawImage(tileTexture,
					tile.type.xImg, tile.type.yImg, 64, 64,
					tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
			}
			this.ctx.rect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
		});
		this.ctx.stroke();
	}

	private drawPlayer() {
		this.ctx.beginPath();
		this.ctx.fillStyle = '#ff0000';
		this.ctx.strokeStyle = '#ec7878';

		this.ctx.arc(this.player.x * this.tileSize, this.player.y * this.tileSize, 4, 0, 2 * Math.PI);

		this.ctx.moveTo(this.player.x * this.tileSize, this.player.y * this.tileSize);
		this.ctx.lineTo(
			this.player.x*this.tileSize + 1000 * Math.cos(this.player.dir),
			this.player.y*this.tileSize + 1000 * Math.sin(this.player.dir)
		);

		this.ctx.fill();
		this.ctx.stroke();
	}

	click(e:MouseEvent):void{
		e.preventDefault();
		e.stopPropagation();

		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const tileFound = this.tiles.find(tile => {
			return tile.x === Math.floor(x/this.tileSize) && tile.y === Math.floor(y/this.tileSize);
		});

		if(!tileFound) return;

		// const currentIndex:number = Object.values(tileTypes).findIndex(v => v===tileFound.type);
		//
		// const newIndex = (currentIndex+1) % Object.values(tileTypes).length;
		//
		// tileFound.type = Object.values(tileTypes)[newIndex];

		tileFound.type = Object.values(tileTypes)[this.selectedIndex];
	}


	render():HTMLDivElement {
		const el = document.createElement('div');
		el.appendChild(this.canvas);
		el.appendChild(this.tileSelector);
		return el;
	}
}

export default RendererPreview;
