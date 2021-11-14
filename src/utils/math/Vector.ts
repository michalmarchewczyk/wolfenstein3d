class Vector {
	constructor(public x:number = 0, public y:number = 0) {

	}


	add(vector:Vector):Vector {
		const result = new Vector(this.x, this.y);
		result.x += vector.x;
		result.y += vector.y;
		return result;
	}

	multiply(scalar:number):Vector {
		const result = new Vector(this.x, this.y);
		result.x *= scalar;
		result.y *= scalar;
		return result;
	}

	divide(scalar:number):Vector {
		const result = new Vector(this.x, this.y);
		result.x /= scalar;
		result.y /= scalar;
		return result;
	}

	get magnitude():number {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	get normalized():Vector {
		const result = new Vector(this.x, this.y);
		return result.divide(this.magnitude);
	}

	clone():Vector {
		return new Vector(this.x, this.y);
	}

}


export default Vector;
