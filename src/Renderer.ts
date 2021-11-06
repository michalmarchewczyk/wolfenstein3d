import textures from './assets/textures.png';
import Vector from '@src/utils/Vector';
import Tile from '@src/Tile';
import Player from '@src/Player';
import Raycaster from '@src/Raycaster';
import Sprite, {SpriteType} from '@src/Sprite';
import {spriteTexture, spriteTextureMirrored} from '@src/SpriteTexture';
import Entity from '@src/Entity';

class Renderer {
	private readonly element:HTMLDivElement;
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private readonly texturesImg: HTMLImageElement;
	private raycaster:Raycaster;
	private zBuffer:number[] = [];

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player, private sprites:Sprite[], private entities:Entity[] = []){
		this.element = document.createElement('div');
		this.element.appendChild(this.canvas);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.ctx = this.canvas.getContext('2d', {alpha: false})!;
		this.canvas.width = 640;
		this.canvas.height = 480;
		this.canvas.classList.add('mainView');

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
		this.ctx.imageSmoothingEnabled = false;

		this.ctx.fillStyle = '#7a7a7a';
		this.ctx.fillRect(0, 0, 640, 480);
		this.ctx.fillStyle = '#383838';
		this.ctx.fillRect(0, 0, 640, 240);


		this.zBuffer = [];

		for(let i = -0.7; i <= 0.7; i += 0.007){
			const offset = Math.atan(i/0.9);
			this.raycast(new Vector(
				Math.cos(this.player.dir+offset),
				Math.sin(this.player.dir+offset)
			), i, offset);
		}


		this.sprites.sort((a,b) => {
			const distA = Math.sqrt((this.player.x - a.x) * (this.player.x - a.x) + (this.player.y - a.y) * (this.player.y - a.y));
			const distB = Math.sqrt((this.player.x - b.x) * (this.player.x - b.x) + (this.player.y - b.y) * (this.player.y - b.y));
			return distB - distA;
		});

		this.drawSprites();

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	raycast(vRayDir:Vector, scanline:number, angle:number):void {

		const vRayStart = new Vector(this.player.x, this.player.y);

		const {distance, found, vIntersection, side, perpWallDist, vStep, vFound} = this.raycaster.raycast(vRayDir, vRayStart);

		if(!found) {
			this.zBuffer[angle] = 100000;
			return;
		}

		let darkness = 0;
		let xTex = 0;

		if(side === 0 && vStep.x < 0){
			darkness = 0.6;
			xTex = 1 - (vIntersection.y - Math.floor(vIntersection.y));
		}else if(side === 0 && vStep.x > 0){
			darkness = 0.6;
			xTex = vIntersection.y - Math.floor(vIntersection.y);
		}else if(side === 1 && vStep.y < 0){
			xTex = vIntersection.x - Math.floor(vIntersection.x);
		}else if(side === 1 && vStep.y > 0){
			xTex = 1 - (vIntersection.x - Math.floor(vIntersection.x));
		}
		darkness = darkness + distance/20;

		const foundTile:Tile = this.map[vFound.x][vFound.y];


		this.zBuffer[angle] = distance;

		this.drawLine(
			Math.floor((scanline+0.7) * 458),
			400 / (perpWallDist * Math.cos(angle)),
			darkness,
			xTex,
			foundTile);
	}

	drawLine(scanline: number, height: number, darkness: number, xTex:number, tile:Tile):void {

		this.ctx.drawImage(this.texturesImg,
			tile.type.xImg + xTex*63.5 - 110/height, tile.type.yImg, 220/height, 64,
			scanline, 240-height/2, 3.6, height
		);

		this.ctx.globalAlpha = darkness/2;
		this.ctx.beginPath();
		this.ctx.fillStyle = '#000000';
		this.ctx.rect(scanline, 240-height/2, 4, height);
		this.ctx.fill();
		this.ctx.globalAlpha = 1;
	}

	drawSprites(){
		this.sprites.forEach(sprite => {
			if(sprite.type === SpriteType.Normal){
				this.drawSprite(sprite);
			}else{
				this.drawSpriteDirectional(sprite);
			}
		});

		this.entities.forEach(entity => {
			entity.sprites.forEach(sprite => {
				if(sprite.type === SpriteType.Normal){
					this.drawSprite(sprite);
				}else{
					this.drawSpriteDirectional(sprite);
				}
			});
		});
	}

	private drawSprite(sprite: Sprite) {
		const dist = Math.sqrt((sprite.x - this.player.x) * (sprite.x - this.player.x) + (sprite.y - this.player.y) * (sprite.y - this.player.y));
		const vSDir = (new Vector(
			sprite.x - this.player.x,
			sprite.y - this.player.y
		)).normalized;
		let diff = (this.player.dir) - (Math.atan2(vSDir.y, vSDir.x));
		diff = (diff + 3*Math.PI) % (2*Math.PI) - Math.PI;

		const scale = (1+Math.abs(diff/5));

		for (let i = -0.7; i < 0.7; i += 0.007) {
			const offset = Math.atan(i/0.9);

			if(dist >= this.zBuffer[offset]){
				continue;
			}

			let aDiff = (this.player.dir) + i - (Math.atan2(vSDir.y, vSDir.x));

			aDiff = (aDiff + 3*Math.PI) % (2*Math.PI) - Math.PI;

			const scanline = (i + 0.7) * 458;

			if (Math.abs(aDiff) < 0.44 * (1 / dist) * scale) {
				this.ctx.drawImage(spriteTexture, sprite.texture.xImg + ((aDiff * dist + 0.44 * scale) * 1.12 * 128 / scale), sprite.texture.yImg, 1, 128,
					scanline, 240 - (scale / dist * 400) / 2, 4, scale / dist * 400);
			}

		}
	}

	private drawSpriteDirectional(sprite:Sprite){
		const startPoint = new Vector(
			sprite.x,
			sprite.y
		);
		const endPoint = new Vector(
			sprite.x,
			sprite.y
		);
		if(sprite.type === SpriteType.EW){
			startPoint.x -= 0.5;
			endPoint.x += 0.5;
		}else if(sprite.type === SpriteType.NS){
			startPoint.y -= 0.5;
			endPoint.y += 0.5;
		}
		const playerPoint = new Vector(
			this.player.x,
			this.player.y
		);

		for(let i = -0.7; i < 0.7; i+= 0.007){
			const offset = Math.atan(i/0.9);
			const vDir = new Vector(
				Math.cos(this.player.dir + offset),
				Math.sin(this.player.dir + offset)
			);
			const rayPoint = new Vector(
				playerPoint.x + vDir.x * 200,
				playerPoint.y + vDir.y * 200,
			);

			const a1 = endPoint.y - startPoint.y;
			const b1 = startPoint.x - endPoint.x;
			const c1 = a1 * startPoint.x + b1 * startPoint.y;

			const a2 = rayPoint.y - playerPoint.y;
			const b2 = playerPoint.x - rayPoint.x;
			const c2 = a2 * playerPoint.x + b2 * playerPoint.y;

			const det = a1 * b2 - a2 * b1;

			if(det === 0){
				return;
			}

			const x = (b2*c1-b1*c2)/det;
			const y = (a1*c2-a2*c1)/det;

			const scanline = (i + 0.7) * 458;

			const dist = Math.sqrt((x-playerPoint.x)*(x-playerPoint.x) + (y-playerPoint.y)*(y-playerPoint.y));

			if(dist >= this.zBuffer[offset]){
				continue;
			}

			const height = 400 / (dist * Math.cos(offset));

			let minX = Math.min(startPoint.x, endPoint.x);
			let maxX = Math.max(startPoint.x, endPoint.x);
			let minY = Math.min(startPoint.y, endPoint.y);
			let maxY = Math.max(startPoint.y, endPoint.y);
			if(sprite.type === SpriteType.EW){
				minX = minX+0.01;
				maxX = maxX-0.01;
				minY = minY-0.05;
				maxY = maxY+0.05;
			}else if(sprite.type === SpriteType.NS){
				minY = minY+0.01;
				maxY = maxY-0.01;
				minX = minX-0.05;
				maxX = maxX+0.05;
			}


			const minRX = Math.min(playerPoint.x, rayPoint.x);
			const maxRX = Math.max(playerPoint.x, rayPoint.x);
			const minRY = Math.min(playerPoint.y, rayPoint.y);
			const maxRY = Math.max(playerPoint.y, rayPoint.y);

			let xTex = 0;
			if(sprite.type === SpriteType.EW){
				xTex = (x-minX)/(maxX-minX);
			}else if(sprite.type === SpriteType.NS){
				xTex = (y-minY)/(maxY-minY);
			}

			let texture = spriteTexture;
			if((sprite.type === SpriteType.EW && vDir.y > 0) || (sprite.type === SpriteType.NS && vDir.x < 0)){
				xTex = 1 - xTex;
				texture = spriteTextureMirrored;
			}

			if(x >= minX && x <= maxX && y >= minY && y <= maxY &&
				x >= minRX && x <= maxRX && y >= minRY && y <= maxRY){
				this.zBuffer[offset] = dist;

				this.ctx.drawImage(texture,
					sprite.texture.xImg + xTex*127 - 220/height, sprite.texture.yImg, 440/height, 128,
					scanline, 240-height/2, 3.6, height
				);
				let darkness = 0;
				if(sprite.type === SpriteType.NS){
					darkness = 0.4;
				}
				darkness = darkness + dist/20;
				this.ctx.beginPath();
				this.ctx.fillStyle = '#000000';
				this.ctx.globalAlpha = darkness/2;
				this.ctx.rect(scanline-1, 240-height/2, 3.33, height);
				this.ctx.fill();
				this.ctx.globalAlpha = 1;

			}


		}
	}

	render():HTMLDivElement {
		return this.element;
	}
}

export default Renderer;
