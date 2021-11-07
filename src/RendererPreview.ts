import Tile from '@src/Tile';
import Player from '@src/Player';
import Vector from '@src/utils/Vector';
import Raycaster from '@src/Raycaster';
import {tileTexture, tileTypes} from '@src/TileType';
import Sprite from '@src/Sprite';
import {spriteTexture} from '@src/SpriteTexture';
import Entity from '@src/Entity';
import {FOV, HORIZONTAL_RESOLUTION, PREVIEW_SIZE} from '@src/settings';

class RendererPreview {
	private canvasDynamic = document.createElement('canvas');
	private canvasStatic = document.createElement('canvas');
	private ctxD:CanvasRenderingContext2D;
	private ctxS:CanvasRenderingContext2D;
	private readonly tileSize:number;
	private raycaster:Raycaster;
	private tileSelector = document.createElement('div');
	private selectedIndex = 0;

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player, private sprites:Sprite[], private entities:Entity[] = []){
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.ctxD = this.canvasDynamic.getContext('2d', {alpha: true})!;
		this.canvasDynamic.width = PREVIEW_SIZE;
		this.canvasDynamic.height = PREVIEW_SIZE;
		this.canvasDynamic.classList.add('previewDynamic');

		this.ctxS = this.canvasStatic.getContext('2d', {alpha: false})!;
		this.canvasStatic.width = PREVIEW_SIZE;
		this.canvasStatic.height = PREVIEW_SIZE;
		this.canvasStatic.classList.add('previewStatic');

		this.tileSize = PREVIEW_SIZE / this.map.length;
		this.tileSelector.classList.add('tileSelector');

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type.opaque;
		});

		this.canvasDynamic.onclick = (e) => {
			this.click(e);
		};

		this.drawSelector();

		this.drawStatic();

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	drawStatic():void {
		this.ctxS.fillStyle = '#aaaaaa';
		this.ctxS.fillRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);
		this.drawTiles();

		this.sprites.forEach(sprite => {
			this.ctxS.drawImage(spriteTexture, sprite.texture.xImg, sprite.texture.yImg, 128, 128,
				(sprite.x-0.5) * this.tileSize, (sprite.y-0.5)*this.tileSize, this.tileSize, this.tileSize);
		});
	}

	draw():void{
		this.ctxD.fillStyle = '#111111';
		this.ctxD.clearRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);
		this.drawPlayer();

		this.ctxD.beginPath();
		this.ctxD.fillStyle = '#4eb830';
		this.ctxD.strokeStyle = '#b7f1a6';
		for(let i = FOV/-2; i <= FOV/2; i += FOV/HORIZONTAL_RESOLUTION){
			const offset = Math.atan(i/0.9);
			this.raycast(new Vector(
				Math.cos(this.player.dir+offset),
				Math.sin(this.player.dir+offset)
			));
		}
		this.ctxD.stroke();
		this.ctxD.fill();

		this.entities.forEach(entity => {
			entity.sprites.slice(0,1).forEach(sprite => {
				this.ctxD.drawImage(spriteTexture, sprite.texture.xImg, sprite.texture.yImg, 128, 128,
					(sprite.x-0.5) * this.tileSize, (sprite.y-0.5)*this.tileSize, this.tileSize, this.tileSize);
			});
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
			this.ctxD.moveTo(
				this.player.x * this.tileSize,
				this.player.y * this.tileSize
			);
			this.ctxD.lineTo(
				vIntersection.x * this.tileSize,
				vIntersection.y * this.tileSize
			);
			this.ctxD.moveTo(
				vIntersection.x * this.tileSize,
				vIntersection.y * this.tileSize
			);
			this.ctxD.arc(
				vIntersection.x * this.tileSize,
				vIntersection.y * this.tileSize,
				2, 0, 2 * Math.PI
			);
		}else{
			this.ctxD.moveTo(
				this.player.x * this.tileSize,
				this.player.y * this.tileSize
			);
			this.ctxD.lineTo(
				vRayDir.multiply(200).add(vRayStart).x * this.tileSize,
				vRayDir.multiply(200).add(vRayStart).y * this.tileSize,
			);
		}

	}

	private drawTiles() {
		this.ctxS.beginPath();
		this.ctxS.strokeStyle = '#444444';
		this.ctxS.lineWidth = 0.5;

		this.tiles.forEach(tile => {
			this.ctxS.fillStyle = '#111111';
			if (tile.type.opaque) {
				this.ctxS.fillStyle = '#134ac2';
			}
			this.ctxS.fillRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
			if(tile.type.opaque){
				this.ctxS.drawImage(tileTexture,
					tile.type.xImg, tile.type.yImg, 64, 64,
					tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
			}
			this.ctxS.rect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
		});
		this.ctxS.stroke();
	}

	private drawPlayer() {
		this.ctxD.beginPath();
		this.ctxD.fillStyle = '#ff0000';
		this.ctxD.strokeStyle = '#ec7878';

		this.ctxD.arc(this.player.x * this.tileSize, this.player.y * this.tileSize, 4, 0, 2 * Math.PI);

		this.ctxD.moveTo(this.player.x * this.tileSize, this.player.y * this.tileSize);
		this.ctxD.lineTo(
			this.player.x*this.tileSize + 1000 * Math.cos(this.player.dir),
			this.player.y*this.tileSize + 1000 * Math.sin(this.player.dir)
		);

		this.ctxD.fill();
		this.ctxD.stroke();
	}

	click(e:MouseEvent):void{
		e.preventDefault();
		e.stopPropagation();

		const rect = this.canvasDynamic.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const tileFound = this.tiles.find(tile => {
			return tile.x === Math.floor(x/this.tileSize) && tile.y === Math.floor(y/this.tileSize);
		});

		if(!tileFound) return;

		tileFound.type = Object.values(tileTypes)[this.selectedIndex];

		this.drawStatic();
	}


	render():HTMLDivElement {
		const el = document.createElement('div');
		el.appendChild(this.canvasStatic);
		el.appendChild(this.canvasDynamic);
		el.appendChild(this.tileSelector);
		return el;
	}
}

export default RendererPreview;
