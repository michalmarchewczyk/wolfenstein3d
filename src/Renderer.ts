import textures from './assets/textures.png';
import Vector from '@src/Vector';
import Tile from '@src/Tile';
import Player from '@src/Player';
import Raycaster from '@src/Raycaster';

class Renderer {
	private element:HTMLDivElement;
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private texturesImg: HTMLImageElement;
	private raycaster:Raycaster;

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player){
		this.element = document.createElement('div');
		this.element.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d')!;
		this.canvas.width = 640;
		this.canvas.height = 480;

		this.texturesImg = new Image();
		this.texturesImg.src = textures;

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type === 'wall';
		});

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

		const {distance, found, vIntersection, side, perpWallDist, vStep} = this.raycaster.raycast(vRayDir, vRayStart);

		if(!found) return;

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
		darkness = darkness + distance/20;


		this.drawLine(
			(scanline+0.7) * 458,
			400 / (perpWallDist * Math.cos(scanline/1.1)),
			darkness,
			xTex);
	}

	drawLine(scanline: number, height: number, darkness: number, xTex:number):void {
		this.ctx.drawImage(this.texturesImg,
			128 + xTex*64, 128, 1, 64,
			scanline, 240-height/2, 4, height
		);

		this.ctx.globalAlpha = darkness/2;
		this.ctx.beginPath();
		this.ctx.fillStyle = '#000000';
		this.ctx.rect(scanline-0.5, 240-height/2, 5, height);
		this.ctx.fill();
		this.ctx.globalAlpha = 1;
	}


	render():HTMLDivElement {
		return this.element;
	}
}

export default Renderer;
