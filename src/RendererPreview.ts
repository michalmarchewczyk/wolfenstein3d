import Tile from '@src/Tile';
import Player from '@src/Player';
import Vector from '@src/Vector';

const PREVIEW_SIZE = 300;

class RendererPreview {
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private tileSize:number;

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player){
		this.ctx = this.canvas.getContext('2d')!;
		this.canvas.width = PREVIEW_SIZE;
		this.canvas.height = PREVIEW_SIZE;
		this.tileSize = PREVIEW_SIZE / this.map.length;

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
			), i);
		}

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	raycast(vRayDir:Vector, scanline:number):void {
		const vRayStart = new Vector(this.player.x, this.player.y);

		vRayDir = vRayDir.normalized;

		const vRayUnitStepSize = new Vector(Math.abs(1 / vRayDir.x), Math.abs(1 / vRayDir.y),);
		const vMapCheck = new Vector(Math.floor(vRayStart.x), Math.floor(vRayStart.y),);
		const vRayLength1D:Vector = new Vector(0,0);
		const vStep:Vector = new Vector(0,0);

		if(vRayDir.x < 0){
			vStep.x = -1;
			vRayLength1D.x = (vRayStart.x - vMapCheck.x) * vRayUnitStepSize.x;
		}else{
			vStep.x = 1;
			vRayLength1D.x = (vMapCheck.x + 1 - vRayStart.x) * vRayUnitStepSize.x;
		}

		if(vRayDir.y < 0){
			vStep.y = -1;
			vRayLength1D.y = (vRayStart.y - vMapCheck.y) * vRayUnitStepSize.y;
		}else{
			vStep.y = 1;
			vRayLength1D.y = (vMapCheck.y + 1 - vRayStart.y) * vRayUnitStepSize.y;
		}

		let bTileFound = false;
		const fMaxDistance = 20;
		let fDistance = 0;

		while(!bTileFound && fDistance < fMaxDistance){
			if(vRayLength1D.x < vRayLength1D.y){
				vMapCheck.x = Math.floor(vMapCheck.x + vStep.x);
				fDistance = vRayLength1D.x;
				vRayLength1D.x += vRayUnitStepSize.x;
			}else {
				vMapCheck.y = Math.floor(vMapCheck.y + vStep.y);
				fDistance = vRayLength1D.y;
				vRayLength1D.y += vRayUnitStepSize.y;
			}
			if(this.map[Math.floor(vMapCheck.x)]?.[Math.floor(vMapCheck.y)]?.type === 'wall'){
				bTileFound = true;
			}
		}


		let vIntersection = new Vector(0,0);
		if(bTileFound){
			vIntersection = vRayStart.add(vRayDir.multiply(fDistance));

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
