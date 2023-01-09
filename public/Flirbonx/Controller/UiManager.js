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
        this.changeLanguage(this.dataManager.save.user.lang);
        this.setTheme(this.dataManager.save.user.theme);

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

        addEventListener('contextmenu', (ev) => {
            ev.preventDefault();
        });

        document.querySelector('[data-layout]').click();
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
        this.currentData = data;

        this.dataManager.saveData();

        const corePartial = await this.requestManager.getPartial(partialName);
        this.uiRenderer.renderPartial(newLayout, corePartial, partialName, data);
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
            if (this.currentFooter) {
                this.currentFooter.classList.remove('footer__selected');
            }
            switch (dataset.partial) {
                case 'Profile':
                    this.changeLayout(dataset.layout, dataset.partial, this.dataManager.save.user);
                    this.currentFooter = ev.target;
                    this.currentFooter.classList.add('footer__selected');
                    break;

                default:
                    if (dataset.partial) {
                        this.changeLayout(dataset.layout, dataset.partial);
                        this.currentFooter = ev.target;
                        this.currentFooter.classList.add('footer__selected');
                    }
                    break;
            }
        }
    }

    /**
     * setTheme met à jour le thème de couleur de l'application
     * @param {String} theme Nouveau thème à appliquer
     */
    setTheme(theme) {
        document.documentElement.className = `theme__${theme}`;
    }
}