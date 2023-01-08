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
}