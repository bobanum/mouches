export default class Objet {
	_dom = null;
	constructor() {
		this._x = 0;
		this._y = 0;
		this.vitesseX = 0;
		this.vitesseY = 0;
		this.accelerationX = 0;
		this.accelerationY = 0;
		this._angle = 0;
		this.rotation = 0;
		this.profondeur = 0;
	}
	get x() {
		return this._x;
	}
	set x(value) {
		if (value === this._x) return;
		this._x = value;
		this.dom.style.left = value + '%';
	}
	get y() {
		return this._y;
	}
	set y(value) {
		if (value === this._y) return;
		this._y = value;
		this.dom.style.top = value + '%';
	}
	get angle() {
		return this._angle;
	}
	set angle(value) {
		if (value === this._angle) return;
		this._angle = value;
		this.dom.style.setProperty('--angle', value);
	}
	get dom() {
		if (!this._dom) {
			this._dom = this.dom_img();
			this._dom.obj = this;
		}
		return this._dom;
	}
	move() {
		this.x += this.vitesseX;
		this.y += this.vitesseY;
		this.vitesseX += this.accelerationX;
		this.vitesseY += this.accelerationY;
		this.angle += this.rotation;
	}
	dom_img(src, ...className) {
		const img = document.createElement('img');
		img.src = src;
		img.classList.add(...["objet", ...className]);
		return img;
	}
}