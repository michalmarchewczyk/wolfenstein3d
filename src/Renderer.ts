import textures from './assets/textures.png';
import Vector from '@src/Vector';
import Tile from '@src/Tile';
import Player from '@src/Player';

class Renderer {
	private element:HTMLDivElement;
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private texturesImg: HTMLImageElement;

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player){
		this.element = document.createElement('div');
		this.element.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d')!;
		this.canvas.width = 640;
		this.canvas.height = 480;

		this.texturesImg = new Image();
		this.texturesImg.src = textures;

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	draw():void {
		this.ctx.fillStyle = '#7a7a7a';
		this.ctx.fillRect(0, 0, 640, 480);
		this.ctx.fillStyle = '#383838';
		this.ctx.fillRect(0, 0, 640, 240);

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
		let side = 0;

		while(!bTileFound && fDistance < fMaxDistance){
			if(vRayLength1D.x < vRayLength1D.y){
				vMapCheck.x = Math.floor(vMapCheck.x + vStep.x);
				fDistance = vRayLength1D.x;
				vRayLength1D.x += vRayUnitStepSize.x;
				side = 0;
			} else {
				vMapCheck.y = Math.floor(vMapCheck.y + vStep.y);
				fDistance = vRayLength1D.y;
				vRayLength1D.y += vRayUnitStepSize.y;
				side = 1;
			}
			if(this.map[Math.floor(vMapCheck.x)]?.[Math.floor(vMapCheck.y)]?.type === 'wall'){
				bTileFound = true;
			}
		}


		let vIntersection = new Vector(0,0);
		if(bTileFound){
			vIntersection = vRayStart.add(vRayDir.multiply(fDistance));

			let perpWallDist = 0;

			if(side === 0){
				perpWallDist = vRayLength1D.x - vRayUnitStepSize.x;
			}else{
				perpWallDist = vRayLength1D.y - vRayUnitStepSize.y;
			}

			let darkness = 0;

			let xTex = 0;

			if(side === 0 && vStep.x < 0){
				darkness = 0;
				xTex = 1 - (vIntersection.y - Math.floor(vIntersection.y));
			}else if(side === 0 && vStep.x > 0){
				darkness = 0.4;
				xTex = vIntersection.y - Math.floor(vIntersection.y);
			}else if(side === 1 && vStep.y < 0){
				darkness = 0.2;
				xTex = vIntersection.x - Math.floor(vIntersection.x);
			}else if(side === 1 && vStep.y > 0){
				darkness = 0.5;
				xTex = 1 - (vIntersection.x - Math.floor(vIntersection.x));
			}


			this.drawLine(
				(scanline+0.7) * 458,
				400 / (perpWallDist * Math.cos(scanline/1.1)),
				`hsl(${xTex*360},90%, ${50-perpWallDist*1-darkness*20}%)`,
				xTex);
		}
	}

	drawLine(scanline: number, height: number, color: string, xTex:number):void {
		// this.ctx.beginPath();
		// this.ctx.fillStyle = color;
		// this.ctx.rect(scanline, 240-height/2, 4, height);
		//
		// this.ctx.fill();w

		this.ctx.drawImage(this.texturesImg,
			128 + xTex*64, 128, 1, 64,
			scanline, 240-height/2, 4, height
		);
	}


	render():HTMLDivElement {
		return this.element;
	}
}

export default Renderer;
