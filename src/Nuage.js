import Objet from "./Objet.js";

export default class Nuage extends Objet {
	constructor() {
		super();
		this.vitesseX = 0;
		this.vitesseY = 0;
	}
	dom_img() {
		const img = super.dom_img('img/nuage.svg', "nuage");
		return img;
	}
}