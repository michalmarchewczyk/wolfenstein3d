import Vector from '@src/utils/math/Vector';

export const findIntersection = (s1:Vector, e1:Vector, s2:Vector, e2:Vector):Vector | null => {
	const a1 = e1.y - s1.y;
	const b1 = s1.x - e1.x;
	const c1 = a1 * s1.x + b1 * s1.y;

	const a2 = e2.y - s2.y;
	const b2 = s2.x - e2.x;
	const c2 = a2 * s2.x + b2 * s2.y;

	const det = a1 * b2 - a2 * b1;

	if (det === 0) {
		return null;
	}

	const x = (b2 * c1 - b1 * c2) / det;
	const y = (a1 * c2 - a2 * c1) / det;

	return new Vector(x, y);
};
