interface Weapon {
	name:string,
	yTex:number,
	xTex:number,
	delay:number,
	range:number,
	angle:number,
	auto:boolean,
	damage: number,
}

export default Weapon;

const weapons:Weapon[] = [
	{
		name: 'knife',
		yTex: 0,
		xTex: 0,
		delay: 0.6,
		range: 1,
		angle: 1,
		auto: false,
		damage: 100,
	},
	{
		name: 'pistol',
		yTex: 65,
		xTex: 49,
		delay: 0.4,
		range: 100,
		angle: 0.2,
		auto: false,
		damage: 20,
	},
	{
		name: 'rifle',
		yTex: 130,
		xTex: 98,
		delay: 0.2,
		range: 200,
		angle: 0.2,
		auto: true,
		damage: 50,
	},
	{
		name: 'minigun',
		yTex: 195,
		xTex: 147,
		delay: 0.1,
		range: 200,
		angle: 0.4,
		auto: true,
		damage: 20,
	}
];

export {
	weapons
};
