import * as Flirbonx from '../index.js';

export class UiManager {

    // Controlleur d'interface actuel
    currentController = null;

    domElements = {
        mainCore: {
            element: '.main__core'
        },

        transition: {
            element: '.transition'
        },

        nav: {
            element: '.footer',
            events: ['click']
        }
    };

    /**
     * Initialisation du manager
     * @param {Flirbonx.DataManager} dataManager Modèle de l'application
     * @param {Flirbonx.UiRenderer} uiRenderer Vue de l'application
     * @param {Flirbonx.RequestManager} requestManager Manager de requêtes
     */
    constructor(dataManager, uiRenderer, requestManager) {
        this.dataManager = dataManager;
        this.uiRenderer = uiRenderer;
        this.requestManager = requestManager;
        this.changeLanguage('fr');

        this.uiRenderer.appendDomElements(this.domElements);

        // Binding des évenements
        for (const key in this.domElements) {
            const element = this.domElements[key];
            if (element.events) {
                element.events.forEach(event => {
                    if (this[`${key}Handler`]) {
                        this.uiRenderer.getElement(key).addEventListener(event, (ev) => this[`${key}Handler`](ev));
                    }
                });
            }
        }

        this.changeLayout(0, 'Home');
    }

    /**
     * changeLanguage() récupère le dictionnaire de langue et le charge dans le moteur de rendu
     * @param {String} lang Nouvelle langue 
     */
    async changeLanguage(lang) {
        this.uiRenderer.currentDictionnary = await this.requestManager.getDictionnary(lang);
        this.uiRenderer.translateArea('mainCore');
    }

    /**
     * changeLayout() change le layout actuellement chargé à la position demandée
     * @param {Number} newLayout Identifiant du nouveau layout à faire apparaitre
     * @param {String} partialName Nom du partial à récupérer
     */
    async changeLayout(newLayout, partialName, data) {
        window.scroll(0, 0);
        this.currentLayout = partialName;

        if (data) {
            this.currentData = data;
        }

        const corePartial = await this.requestManager.getPartial(partialName);
        this.uiRenderer.renderPartial(newLayout, corePartial, partialName, data);
        
        // Recyclage des évenements
        if (this.currentController) {
            this.currentController.recycleEvents();
        }

        setTimeout(() => {
            this.currentController = new Flirbonx[`${partialName}Controller`](this);
        }, 300);
    }


    /**
     * navHandler() gère les clics de navigation
     * @param {Event} ev Evenement au clic sur la section de navigation 
     */
    navHandler(ev) {
        const dataset = ev.target.dataset;
        if (dataset.partial) {
            this.changeLayout(dataset.layout, dataset.partial);
        }
    }
}