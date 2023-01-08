import * as Flirbonx from '../index.js';

export class UiManager {

    // Controlleur d'interface actuel
    currentController = Flirbonx.UiController;
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
     * changeLayout() change
     * @param {Number} newLayout Identifiant du nouveau layout à faire apparaitre
     * @param {String} partialName Nom du partial à récupérer
     */
    async changeLayout(newLayout, partialName, data) {
        window.scroll(0, 0);
        this.currentLayout = partialName;

        const corePartial = await this.requestManager.getPartial(partialName);
        this.uiRenderer.renderPartial(newLayout, corePartial, partialName, data);
        this.currentController = new Flirbonx[`${partialName}Controller`](this);
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