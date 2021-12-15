import Player from '@src/Player';
import Raycaster from '@src/utils/math/Raycaster';

interface Enemy {
	tickEnemy:(delta:number, player:Player, raycaster:Raycaster) => void,
	health: number,
}

export default Enemy;
