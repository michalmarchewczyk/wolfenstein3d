import textures from './assets/textures.png';
import Vector from '@src/Vector';
import Tile from '@src/Tile';
import Player from '@src/Player';
import Raycaster from '@src/Raycaster';
import Sprite from '@src/Sprite';
import {spriteTexture} from '@src/SpriteTexture';

class Renderer {
	private element:HTMLDivElement;
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private texturesImg: HTMLImageElement;
	private raycaster:Raycaster;
	private zBuffer:number[] = [];

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player, private sprites:Sprite[]){
		this.element = document.createElement('div');
		this.element.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d')!;
		this.canvas.width = 640;
		this.canvas.height = 480;

		this.texturesImg = new Image();
		this.texturesImg.src = textures;

		this.raycaster = new Raycaster((x:number, y:number) => {
			return this.map[x]?.[y]?.type.opaque;
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



		this.zBuffer = [];

		for(let i = -0.7; i < 0.7; i += 0.007){
			this.raycast(new Vector(
				Math.cos(this.player.dir+i),
				Math.sin(this.player.dir+i)
			), i);
		}

		// console.log(this.zBuffer);

		// this.ctx.beginPath();
		// this.ctx.strokeStyle = '#ff0000';
		// this.ctx.moveTo(0,0);
		// this.ctx.lineTo(640, 480);
		//
		// this.ctx.stroke();


		this.sprites.sort((a,b) => {
			const distA = Math.sqrt((this.player.x - a.x) * (this.player.x - a.x) + (this.player.y - a.y) * (this.player.y - a.y));
			const distB = Math.sqrt((this.player.x - b.x) * (this.player.x - b.x) + (this.player.y - b.y) * (this.player.y - b.y));
			return distB - distA;
		});

		// console.log(this.zBuffer);
		// console.log(this.sprites);

		this.drawSprites();

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	raycast(vRayDir:Vector, scanline:number):void {

		const vRayStart = new Vector(this.player.x, this.player.y);

		const {distance, found, vIntersection, side, perpWallDist, vStep, vFound} = this.raycaster.raycast(vRayDir, vRayStart);

		// this.zBuffer[(scanline+0.7) * 458] = 1000000;

		if(!found) {
			this.zBuffer.push(100000);
			return;
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
		darkness = darkness + distance/20;

		const foundTile:Tile = this.map[vFound.x][vFound.y];

		// this.zBuffer[(scanline+0.7) * 458] = (perpWallDist * Math.cos(scanline/1.2));
		// this.zBuffer[(scanline+0.7) * 458] = distance;
		this.zBuffer.push(distance);

		this.drawLine(
			(scanline+0.7) * 458,
			400 / (perpWallDist * Math.cos(scanline/1.2)),
			darkness,
			xTex,
			foundTile);
	}

	drawLine(scanline: number, height: number, darkness: number, xTex:number, tile:Tile):void {
		this.ctx.imageSmoothingEnabled = false;

		this.ctx.drawImage(this.texturesImg,
			tile.type.xImg + xTex*64, tile.type.yImg, 0.1, 64,
			scanline, 240-height/2, 3.3, height
		);

		this.ctx.globalAlpha = darkness/2;
		this.ctx.beginPath();
		this.ctx.fillStyle = '#000000';
		this.ctx.rect(scanline-0.3, 240-height/2, 3.6, height);
		this.ctx.fill();
		this.ctx.globalAlpha = 1;
	}

	drawSprites(){
		this.sprites.forEach(sprite => {
			this.drawSprite(sprite);
		});
	}

	private drawSprite(sprite: Sprite) {
		const dist = Math.sqrt((sprite.x - this.player.x) * (sprite.x - this.player.x) + (sprite.y - this.player.y) * (sprite.y - this.player.y));
		const vSDir = (new Vector(
			(sprite.x - this.player.x),
			(sprite.y - this.player.y)
		)).normalized;

		let j = -1;
		for (let i = -0.7; i < 0.7; i += 0.007) {
			j++;
			const vDir = (new Vector(
				Math.cos(this.player.dir + i),
				Math.sin(this.player.dir + i)
			)).normalized;

			const aDiff = ((Math.atan2(vDir.y, vDir.x) + 4 * Math.PI) % (2 * Math.PI)) - ((Math.atan2(vSDir.y, vSDir.x) + 4 * Math.PI) % (2 * Math.PI));

			const scanline = (i + 0.7) * 458;

			if (Math.abs(aDiff) < 0.48 * (1 / dist) && dist < this.zBuffer[j]) {
				this.ctx.drawImage(spriteTexture, sprite.texture.xImg + ((aDiff * dist + 0.48) * 1.02 * 128), sprite.texture.yImg, 1, 128,
					scanline, 240 - (1 / dist * 400) / 2, 4, 1 / dist * 400);
			}

		}
	}

	render():HTMLDivElement {
		return this.element;
	}
}

export default Renderer;
