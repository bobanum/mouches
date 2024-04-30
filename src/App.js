import Mouche from './Mouche.js';

export default class App {
	_app = null;
	static start() {
		this.objets = [];
		this.frequence = 1000 / 60;
		setInterval(() => {
			this.objets.forEach(obj => {
				obj.move();
			});
		}, 1000 / 60);
		setInterval(() => {
			for (let i = 0; i < 10; i++) {
				const mouche = new Mouche();
				mouche.x = Math.random() * 110;
				mouche.y = Math.random() * 30 - 40;
				this.objets.push(mouche);
				this._app.appendChild(mouche.dom);
			}
		}, 500);

	}
	static ajouterMouche() {
		const mouche = new Mouche();
		this._app.appendChild(mouche.dom);
	}
	static loop() {
		this.mouche.move();
		requestAnimationFrame(() => this.loop());
	}
	static async load() {
		this._app = document.getElementById('app');
		return true;
	}
}