import Tile from '@src/Tile';
import Player from '@src/Player';
import Vector from '@src/Vector';
import Raycaster from '@src/Raycaster';

const PREVIEW_SIZE = 300;

class RendererPreview {
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private tileSize:number;
	private raycaster:Raycaster;

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player){
		this.ctx = this.canvas.getContext('2d')!;
		this.canvas.width = PREVIEW_SIZE;
		this.canvas.height = PREVIEW_SIZE;
		this.tileSize = PREVIEW_SIZE / this.map.length;

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type === 'wall';
		});

		this.canvas.onclick = (e) => {
			this.click(e);
		};

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	draw():void{
		this.ctx.fillStyle = '#aaaaaa';
		this.ctx.fillRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);
		this.drawTiles();
		this.drawPlayer();

		for(let i = -0.7; i < 0.7; i += 0.007){
			this.raycast(new Vector(
				Math.cos(this.player.dir+i),
				Math.sin(this.player.dir+i)
			));
		}

		window.requestAnimationFrame(() => {
			this.draw();
		});
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
			if (tile.type === 'wall') {
				this.ctx.fillStyle = '#134ac2';
			}
			this.ctx.fillRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
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

		if(tileFound.type === 'null'){
			tileFound.type = 'wall';
		}else{
			tileFound.type = 'null';
		}
	}


	render():HTMLCanvasElement {
		return this.canvas;
	}
}

export default RendererPreview;