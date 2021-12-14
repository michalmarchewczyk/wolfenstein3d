import textures from './assets/textures.png';
import Vector from '@src/utils/math/Vector';
import Tile from '@src/Tile';
import Player from '@src/Player';
import Raycaster from '@src/utils/math/Raycaster';
import Sprite, {SpriteType} from '@src/sprites/Sprite';
import {spriteTexture, spriteTextureMirrored} from '@src/sprites/SpriteTexture';
import Entity from '@src/entities/Entity';
import {BLOCK_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, FOV, HORIZONTAL_RESOLUTION} from '@src/settings';
import {calcDist} from '@src/utils/math/distance';
import {findIntersection} from '@src/utils/math/intersection';

class Renderer {
	private readonly element:HTMLDivElement;
	private canvas = document.createElement('canvas');
	private ctx:CanvasRenderingContext2D;
	private readonly texturesImg:HTMLImageElement;
	private raycaster:Raycaster;
	private zBuffer:number[] = [];

	constructor(private map:Tile[][], private tiles:Tile[], private player:Player, private sprites:Sprite[], private entities:Entity[] = []) {
		this.element = document.createElement('div');
		this.element.appendChild(this.canvas);

		this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d', {alpha: false});
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
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
		this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.ctx.fillStyle = '#383838';
		this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT / 2);


		this.zBuffer = [];

		for (let i = FOV / -2; i <= FOV / 2; i += FOV / HORIZONTAL_RESOLUTION) {
			const offset = Math.atan(i / 0.9);
			this.raycast(new Vector(
				Math.cos(this.player.dir + offset),
				Math.sin(this.player.dir + offset)
			), i, offset);
		}

		this.drawSprites();

		window.requestAnimationFrame(() => {
			this.draw();
		});
	}

	raycast(vRayDir:Vector, scanline:number, angle:number):void {

		const vRayStart = new Vector(this.player.x, this.player.y);

		const {
			distance,
			found,
			vIntersection,
			side,
			perpWallDist,
			vStep,
			vFound
		} = this.raycaster.raycast(vRayDir, vRayStart);

		if (!found) {
			this.zBuffer[angle] = 100000;
			return;
		}

		let darkness = 0;
		let xTex = 0;

		if (side === 0 && vStep.x < 0) {
			darkness = 0.6;
			xTex = 1 - (vIntersection.y - Math.floor(vIntersection.y));
		} else if (side === 0 && vStep.x > 0) {
			darkness = 0.6;
			xTex = vIntersection.y - Math.floor(vIntersection.y);
		} else if (side === 1 && vStep.y < 0) {
			xTex = vIntersection.x - Math.floor(vIntersection.x);
		} else if (side === 1 && vStep.y > 0) {
			xTex = 1 - (vIntersection.x - Math.floor(vIntersection.x));
		}
		darkness = darkness + distance / 20;

		const foundTile:Tile = this.map[vFound.x][vFound.y];


		this.zBuffer[angle] = distance;

		this.drawLine(
			Math.round((scanline + FOV / 2) * (CANVAS_WIDTH / FOV)),
			BLOCK_HEIGHT / (perpWallDist * Math.cos(angle)),
			darkness,
			xTex,
			foundTile);
	}

	drawLine(scanline:number, height:number, darkness:number, xTex:number, tile:Tile):void {

		const scaling = 33600 / HORIZONTAL_RESOLUTION;

		this.ctx.drawImage(this.texturesImg,
			tile.type.xImg + xTex * 63 - (scaling / 2) / height + 1, tile.type.yImg, scaling / height, 64,
			Math.floor(scanline), CANVAS_HEIGHT / 2 - height / 2, CANVAS_WIDTH / HORIZONTAL_RESOLUTION, height
		);

		this.ctx.globalAlpha = darkness / 2;
		this.ctx.beginPath();
		this.ctx.fillStyle = '#000000';
		this.ctx.rect(scanline, CANVAS_HEIGHT / 2 - height / 2, CANVAS_WIDTH / HORIZONTAL_RESOLUTION, height);
		this.ctx.fill();
		this.ctx.globalAlpha = 1;
	}

	drawSprites() {
		const spritesToDraw:Sprite[] = [];

		this.entities.forEach(entity => {
			entity.sprites.forEach(sprite => {
				spritesToDraw.push(sprite);
			});
		});

		this.sprites.forEach(sprite => {
			spritesToDraw.push(sprite);
		});

		spritesToDraw.sort((a, b) => {
			const distA = calcDist(this.player.x, this.player.y, a.x, a.y);
			const distB = calcDist(this.player.x, this.player.y, b.x, b.y);
			return distB - distA;
		});

		spritesToDraw.forEach(sprite => {
			this.drawSprite(sprite);
		});
	}

	private drawSprite(sprite:Sprite) {
		if (sprite.type === SpriteType.Normal) {
			this.drawSpriteNormal(sprite);
		} else {
			this.drawSpriteDirectional(sprite);
		}
	}

	private drawSpriteNormal(sprite:Sprite) {
		const dist = calcDist(this.player.x, this.player.y, sprite.x, sprite.y);
		const vSDir = (new Vector(
			sprite.x - this.player.x,
			sprite.y - this.player.y
		)).normalized;
		let diff = (this.player.dir) - (Math.atan2(vSDir.y, vSDir.x));
		diff = (diff + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

		const scale = 1 + Math.abs(Math.sin(diff)) / 3.2;

		for (let i = FOV / -2; i <= FOV / 2; i += FOV / HORIZONTAL_RESOLUTION) {
			const offset = Math.atan(i / 0.9);

			if (dist >= this.zBuffer[offset]) {
				continue;
			}

			let aDiff = (this.player.dir) + i - (Math.atan2(vSDir.y, vSDir.x));

			aDiff = (aDiff + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

			const scanline = Math.round((i + FOV / 2) * (CANVAS_WIDTH / FOV));

			const height = scale / dist * BLOCK_HEIGHT;

			if (Math.abs(aDiff) < 0.44 * (1 / dist) * scale) {
				this.ctx.drawImage(spriteTexture, sprite.texture.xImg + ((aDiff * dist + 0.44 * scale) * 1.12 * 128 / scale),
					sprite.texture.yImg, 1, 128,
					scanline, CANVAS_HEIGHT / 2 - height / 2, CANVAS_WIDTH / HORIZONTAL_RESOLUTION, height);
			}

		}
	}

	private drawSpriteDirectional(sprite:Sprite) {
		const startPoint = new Vector(
			sprite.x,
			sprite.y
		);
		const endPoint = new Vector(
			sprite.x,
			sprite.y
		);
		if (sprite.type === SpriteType.EW) {
			startPoint.x -= 0.5;
			endPoint.x += 0.5;
		} else if (sprite.type === SpriteType.NS) {
			startPoint.y -= 0.5;
			endPoint.y += 0.5;
		}
		const playerPoint = new Vector(
			this.player.x,
			this.player.y
		);

		for (let i = FOV / -2; i <= FOV / 2; i += FOV / HORIZONTAL_RESOLUTION) {
			this.calcDirectionalSpriteLine(i, playerPoint, startPoint, endPoint, sprite);
		}
	}

	private calcDirectionalSpriteLine(i:number, playerPoint:Vector, startPoint:Vector, endPoint:Vector, sprite:Sprite) {
		const offset = Math.atan(i / 0.9);
		const vDir = new Vector(
			Math.cos(this.player.dir + offset),
			Math.sin(this.player.dir + offset)
		);
		const rayPoint = new Vector(
			playerPoint.x + vDir.x * 200,
			playerPoint.y + vDir.y * 200,
		);

		const intersection = findIntersection(startPoint, endPoint, playerPoint, rayPoint);

		if (!intersection) {
			return;
		}

		const x = intersection.x;
		const y = intersection.y;

		const scanline = Math.round((i + FOV / 2) * (CANVAS_WIDTH / FOV));

		const dist = calcDist(x, y, playerPoint.x, playerPoint.y);

		if (dist >= this.zBuffer[offset]) {
			return;
		}

		const height = BLOCK_HEIGHT / (dist * Math.cos(offset));

		let minX = Math.min(startPoint.x, endPoint.x);
		let maxX = Math.max(startPoint.x, endPoint.x);
		let minY = Math.min(startPoint.y, endPoint.y);
		let maxY = Math.max(startPoint.y, endPoint.y);
		if (sprite.type === SpriteType.EW) {
			minX = minX + 0.001;
			maxX = maxX - 0.001;
			minY = minY - 0.004;
			maxY = maxY + 0.004;
		} else if (sprite.type === SpriteType.NS) {
			minY = minY + 0.001;
			maxY = maxY - 0.001;
			minX = minX - 0.004;
			maxX = maxX + 0.004;
		}

		const minRX = Math.min(playerPoint.x, rayPoint.x);
		const maxRX = Math.max(playerPoint.x, rayPoint.x);
		const minRY = Math.min(playerPoint.y, rayPoint.y);
		const maxRY = Math.max(playerPoint.y, rayPoint.y);

		let xTex = 0;
		if (sprite.type === SpriteType.EW) {
			xTex = (x - minX) / (maxX - minX);
		} else if (sprite.type === SpriteType.NS) {
			xTex = (y - minY) / (maxY - minY);
		}

		let texture = spriteTexture;
		if ((sprite.type === SpriteType.EW && vDir.y > 0) || (sprite.type === SpriteType.NS && vDir.x < 0)) {
			xTex = 1 - xTex;
			texture = spriteTextureMirrored;
		}

		if (x >= minX && x <= maxX && y >= minY && y <= maxY &&
			x >= minRX && x <= maxRX && y >= minRY && y <= maxRY) {
			this.zBuffer[offset] = dist;

			this.drawSpriteLine(texture, sprite, xTex, height, scanline, dist);
		}
	}

	private drawSpriteLine(texture:HTMLImageElement, sprite:Sprite, xTex:number, height:number, scanline:number, dist:number) {
		const scaling = 67200 / HORIZONTAL_RESOLUTION;

		this.ctx.drawImage(texture,
			sprite.texture.xImg + xTex * 127 - (scaling / 2) / height, sprite.texture.yImg, (scaling) / height, 128,
			scanline, CANVAS_HEIGHT / 2 - height / 2, CANVAS_WIDTH / HORIZONTAL_RESOLUTION, height
		);
		let darkness = 0;
		if (sprite.type === SpriteType.NS) {
			darkness = 0.6;
		}
		darkness = darkness + dist / 20;
		this.ctx.beginPath();
		this.ctx.fillStyle = '#000000';
		this.ctx.globalAlpha = darkness / 2;
		this.ctx.rect(scanline, CANVAS_HEIGHT / 2 - height / 2, CANVAS_WIDTH / HORIZONTAL_RESOLUTION, height);
		this.ctx.fill();
		this.ctx.globalAlpha = 1;
	}

	render():HTMLDivElement {
		return this.element;
	}
}

export default Renderer;
