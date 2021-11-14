import Vector from '@src/utils/math/Vector';

interface RaycasterResult {
	distance:number,
	found:boolean,
	vIntersection:Vector,
	side:number,
	perpWallDist:number,
	vStep:Vector,
	vFound:Vector,
}

class Raycaster {
	constructor(private checkFunction:(x:number, y:number) => boolean) {

	}

	raycast(vRayDir:Vector, vRayStart:Vector):RaycasterResult {
		vRayDir = vRayDir.normalized;

		const vRayUnitStepSize = new Vector(Math.abs(1 / vRayDir.x), Math.abs(1 / vRayDir.y),);
		const vMapCheck = new Vector(Math.floor(vRayStart.x), Math.floor(vRayStart.y),);
		const vRayLength1D:Vector = new Vector(0, 0);
		const vStep:Vector = new Vector(0, 0);

		vStep.x = Math.sign(vRayDir.x);
		vRayLength1D.x = ((vMapCheck.x - vRayStart.x) * Math.sign(vRayDir.x) + (Math.sign(vRayDir.x) + 1) / 2) * vRayUnitStepSize.x;

		vStep.y = Math.sign(vRayDir.y);
		vRayLength1D.y = ((vMapCheck.y - vRayStart.y) * Math.sign(vRayDir.y) + (Math.sign(vRayDir.y) + 1) / 2) * vRayUnitStepSize.y;


		let bTileFound = false;
		const fMaxDistance = 100;
		let fDistance = 0;
		let side = 0;
		let vFound = new Vector(0, 0);

		while (!bTileFound && fDistance < fMaxDistance) {
			if (vRayLength1D.x < vRayLength1D.y) {
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
			if (this.checkFunction(Math.floor(vMapCheck.x), Math.floor(vMapCheck.y))) {
				bTileFound = true;
				vFound = new Vector(Math.floor(vMapCheck.x), Math.floor(vMapCheck.y));
			}
		}


		let vIntersection = new Vector(0, 0);
		let perpWallDist = 0;


		if (bTileFound) {
			if (side === 0) {
				perpWallDist = vRayLength1D.x - vRayUnitStepSize.x;
			} else {
				perpWallDist = vRayLength1D.y - vRayUnitStepSize.y;
			}
			vIntersection = vRayStart.add(vRayDir.multiply(fDistance));
		}

		return {
			distance: fDistance,
			found: bTileFound,
			vIntersection,
			side,
			perpWallDist,
			vStep,
			vFound,
		};
	}
}

export default Raycaster;
