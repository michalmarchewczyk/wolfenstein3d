interface Weapon {
	name:string,
	yTex:number,
	xTex:number,
	delay:number,
	range:number,
	angle: number,
	auto:boolean,
}

export default Weapon;

const weapons:Weapon[] = [
	{
		name: 'knife',
		yTex: 0,
		xTex: 0,
		delay: 0.6,
		range:2,
		angle: 1,
		auto: false
	},
	{
		name: 'pistol',
		yTex: 65,
		xTex: 49,
		delay: 0.4,
		range: 100,
		angle: 0.2,
		auto: false
	},
	{
		name: 'rifle',
		yTex: 130,
		xTex: 98,
		delay: 0.2,
		range: 200,
		angle: 0.2,
		auto: true
	},
	{
		name: 'minigun',
		yTex: 195,
		xTex: 147,
		delay: 0.1,
		range: 200,
		angle: 0.4,
		auto: true
	}
];

export {
	weapons
};
