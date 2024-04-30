import Mouche from './Mouche.js';
import Nuage from './Nuage.js';

export default class App {
	static _app = null;
	static _actif = false;
	static _gravite = 0.02;
	static get actif() {
		return this._actif;
	}
	static set actif(value) {
		this._actif = value;
		document.body.classList.toggle('actif', value);
	}
	static start() {
		this.objets = [];
		this.vent = .002;
		this.frequence = 1000 / 60;
		setInterval(() => {
			if (!this.actif) return;

			this.objets.forEach((obj, i) => {
				obj.vitesseX += this.vent;
				obj.move();
			});
			this.objets.forEach((obj, i) => {
				if (obj.y > 110) {
					obj.dom.remove();
					this.objets.splice(i, 1);
				}
			});
			this._app.querySelectorAll('.nuage').forEach((nuage) => {
				nuage.obj.vitesseX = this.vent * 100;
				nuage.obj.move();
			});
		}, 1000 / 60);
		setInterval(() => {
			if (!this.actif) return;
			for (let i = 0; i < 50; i++) {
				const mouche = new Mouche();
				do {
					mouche.x = this.randomGaussian(.2) * 110 + 55;
				} while (mouche.x < -10 || mouche.x > 110);
				mouche.y = Math.random() * 30 - 40;
				mouche.vitesseX = this.randomGaussian(.1) * 1;
				mouche.vitesseY = Math.random() * - 1;
				mouche.accelerationY = this._gravite;
				mouche.rotation = Math.random() * 0.01 - 0.005;
				if (Math.random() < 0.5) {
					mouche.dom.classList.add('flip');
				}
				mouche.dom.style.scale = Math.random() * 0.5 + 0.5;
				this.objets.push(mouche);
				this._app.appendChild(mouche.dom);
			}
		}, 500);

	}
	static randomGaussian(ecartType = 1, moyenne = 0) {
		let x1, x2, w;
		do {
			x1 = Math.random() * 2 - 1;
			x2 = Math.random() * 2 - 1;
			w = x1 * x1 + x2 * x2;
		} while (w >= 1);
		w = Math.sqrt(-2 * Math.log(w) / w);
		return moyenne + ecartType * x1 * w;
	}

	static ajouterMouche() {
		const mouche = new Mouche();
		this._app.appendChild(mouche.dom);
	}
	static loop() {
		this.mouche.move();
		requestAnimationFrame(() => this.loop());
	}
	static jouer(btn) {
		this.actif = true;
		btn.addEventListener('click', () => this.arreter(), { once: true });
		btn.innerHTML = 'Arrêter';
	}
	static arreter() {
		this.actif = false;
		document.getElementById('jouer').innerHTML = 'Jouer';
		document.getElementById('jouer').addEventListener('click', (e) => this.jouer(e.currentTarget), { once: true });
	}
	static async load() {
		this._app = document.getElementById('app');
		this._app.addEventListener('mousemove', (e) => {
			this.vent = (e.clientX / e.currentTarget.clientWidth - .5) * 0.01;
			console.log(this.vent,e.currentTarget.clientWidth);
		});
		let nuage = new Nuage();
		nuage.x = 50;
		nuage.y = 50;
		this._app.appendChild(nuage.dom);
		document.getElementById('jouer').addEventListener('click', (e) => this.jouer(e.currentTarget), { once: true });
		document.getElementById('recommencer').addEventListener('click', (e) => {
			this._app.querySelectorAll('.objet').forEach((obj) => obj.remove());
			this.objets = [];
			nuage.x = 50;
			nuage.y = 50;
			this._app.appendChild(nuage.dom);
			this.jouer(document.getElementById('jouer'));
		});
		// this.start();
		return true;
	}
}