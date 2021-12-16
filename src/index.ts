import './styles/main.scss';
import Game from '@src/Game';
import Menu from '@src/HUD/Menu';


document.body.onload = () => {
	let menu:Menu|null = null;
	let view:HTMLDivElement|null = null;
	const game = new Game(() => {
		if(!menu || !view) return;
		menu.showMenu();
		view.appendChild(menu.render());
	}, (score, time, killRatio, secretRatio, treasureRatio) => {
		if(!menu || !view) return;
		view.appendChild(menu.render());
		menu.showWin(score, time, killRatio, secretRatio, treasureRatio);
	});

	view = game.render()[0];
	document.body.appendChild(view);

	const preview = game.render()[1];
	document.body.appendChild(preview);

	menu = new Menu(() => {
		game.initControls();
	});
	view.appendChild(menu.render());
};
