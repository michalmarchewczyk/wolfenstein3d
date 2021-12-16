import './styles/main.scss';
import Game from '@src/Game';
import Menu from '@src/HUD/Menu';


document.body.onload = () => {
	const game = new Game();

	const view = game.render()[0];
	document.body.appendChild(view);

	const preview = game.render()[1];
	document.body.appendChild(preview);

	const menu = new Menu(() => {
		game.initControls();
	});
	view.appendChild(menu.render());
};
