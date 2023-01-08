/**
 * RequestManager représente un gestionnaire de requêtes,
 * on y retrouve toutes les fonctions fetch, récupérant ou envoyant de la donnée.
 */
export class RequestManager {
    /**
    * getPartial() récupere un partial html et le retourne
    * @param {String} partialName Nom du partial à récuperer
    */
    async getPartial(partialName) {
        const req = await fetch(`/views/${partialName}.html`);
        return await req.text();
    }

    /**
     * getDictionnary récupère un dictionnaire de langue
     * @param {String} lang Langue à récupérer
     * @returns {Object} Dictionnaire i18n
     */
    async getDictionnary(lang) {
        const req = await fetch(`/Flirbonx/lang/${lang}.json`);
        return await req.json();
    }

    /**
     * getSave() retourne la sauvegarde de l'utilisateur
     */
    async getSave() {
        const req = await fetch('/Flirbonx/save.json');
        return await req.json();
    }
}