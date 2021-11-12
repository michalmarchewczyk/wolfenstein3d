import './styles/main.scss';
import Game from '@src/Game';


document.body.onload = () => {
	const game = new Game();

	document.body.appendChild(game.render()[0]);
	document.body.appendChild(game.render()[1]);

};
