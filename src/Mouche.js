import Objet from "./Objet.js";

export default class Mouche extends Objet {
	dom_img() {
		const img = super.dom_img('img/mouche.svg', 'mouche');
		return img;
	}
}