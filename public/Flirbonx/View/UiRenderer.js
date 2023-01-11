import { UiHelper } from '../View/UiHelper.js';
/**
 * 👁️ UiRenderer s'occupe du rendu de la vue de l'application en passant du templating par la traduction des données à afficher
 */
export class UiRenderer {
    // Elements visuels de l'application
    domElements = {};

    // Templates de l'application
    templates = {};

    // Module d'aide au formattage
    uiHelper = UiHelper;

    // Layout de l'écran actuellement chargé
    currentLayout = 0;

    // Dictionnaire actuellement chargé
    currentDictionnary = null

    constructor() {
        this.uiHelper = new UiHelper(this);
        const templates = document.querySelector('#templates');

        // Récupération des templates
        for (let i = 0; i < templates.children.length; i++) {
            const template = templates.children[i];
            this.templates[template.className.split('template__')[1]] = template;
        }
    }

    /**
     * appendDomElements() ajoute aux elements visuels actuels un groupe de nouveau éléments récupérables
     * @param {Object} domElements Objet contenant les différents classes des elements visuels à récuperer 
     */
    appendDomElements(domElements) {
        for (const key in domElements) {
            if (this.domElements[key]) {
                delete this.domElements[key]
            }
            this.domElements[key] = document.querySelector(domElements[key].element);
        }
    }

    /**
     * getElement() retourne un noeud du DOM à partir de l'id renseigné
     * @param {String} id Identifiant de l'objet 
     * @returns {Node} Noeud demandé
     */
    getElement(id) {
        return this.domElements[id];
    }


    /**
     * renderPartial() déplace la vue sur un nouvel écran formatté
     * @param {Number} layoutId Id de l'écran à remplir
     * @param {String} partialContent Contenu du partial selectionné
     * @param {String} partialName Nom du partial sélectionné
     * @param {Object} obj Objet à formatter
     */
    renderPartial(layoutId, partialContent, partialName, obj) {
        // Formattage clef valeurs
        const toFormat = Array.from(partialContent.matchAll(/{{(.*?)}}/gi));
        for (let i = 0; i < toFormat.length; i++) {
            let helper;
            let key = toFormat[i][1].split('#');
            if (key.length > 2) {
                helper = key[1];
            }
            key = key[0];
            const tag = `{{${key}}}`;
            if (obj && obj[key]) {
                if (helper) {
                    partialContent = this.uiHelper[helper](obj[key]);
                } else {
                    partialContent = partialContent.replaceAll(tag, obj[key]);
                }
            } else {
                partialContent = partialContent.replaceAll(tag, '');
            }
        }

        if (this.currentLayout == layoutId) {
            this.getElement('transition').classList.add('transition__open');
            setTimeout(() => {
                const section = this.getElement('mainCore').children[layoutId];
                section.innerHTML = partialContent;
                // Traduction
                this.translateArea('mainCore');
                setTimeout(() => {
                    this.getElement('transition').classList.remove('transition__open');
                }, 200);
            }, 200);
        } else {
            // Attribution de l'id layout
            this.currentLayout = layoutId;

            const section = this.getElement('mainCore').children[layoutId];
            this.getElement('mainCore').style.transform = `translateX(${-layoutId * 100}%)`;
            section.innerHTML = partialContent;
            // Traduction
            this.translateArea('mainCore');
        }
    }

    /**
     * renderTemplate() formatte une template à partir d'un tableau d'objet et l'envoie dans le dom destination
     * @param {Node} template 
     * @param {Array<Object>} arrayObj 
     * @param {String} destination 
     */
    renderTemplate(template, arrayObj, destination) {
        const toFormat = Array.from(this.templates[template].innerHTML.matchAll(/{{(.*?)}}/gi));
        let formattedTemplates = '';
        for (let i = 0; i < arrayObj.length; i++) {
            const obj = arrayObj[i];
            let helper;
            obj._id = i;
            formattedTemplates += this.templates[template].innerHTML;
            for (let j = 0; j < toFormat.length; j++) {
                let key = toFormat[j][1].split('#');
                if (key.length > 2) {
                    helper = key[1];
                }
                key = key[0];
                const tag = `{{${key}}}`;
                if (obj[key] !== undefined) {
                    if (helper) {
                        formattedTemplates = this.uiHelper[helper](obj[key]);
                    } else {
                        formattedTemplates = formattedTemplates.replaceAll(tag, obj[key]);
                    }
                } else {
                    formattedTemplates = formattedTemplates.replaceAll(tag, '');
                }
            }
        }
        // Retour des données
        if (destination) {
            this.getElement(destination).innerHTML = formattedTemplates;
            this.translateArea(destination);
        } else {
            return formattedTemplates;
        }
    }

    /**
    * translateArea() traduit toutes les données taggées par i18n grâce au dictionnaire actuellement chargé
    * @param {Node} area Zone du DOM à traduire à partir du dictionnaire actuel
    */
    translateArea(area) {
        const elements = this.getElement(area).querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            switch (element.tagName) {
                case 'INPUT':
                    if (element.type === 'submit') {
                        element.value = this.currentDictionnary[element.dataset.i18n];
                    } else {
                        element.placeholder = this.currentDictionnary[element.dataset.i18n];
                    }
                    break;

                case 'TEXTAREA':
                    element.placeholder = this.currentDictionnary[element.dataset.i18n];
                    break;

                default:
                    element.innerHTML = this.currentDictionnary[element.dataset.i18n];
                    break;
            }

            if (element.dataset.title) {
                element.dataset.title = this.currentDictionnary[element.dataset.i18n];
            }
        });
    }

    /**
     * translateValue() applique une valeur traduite à un élément du DOM selectionné
     * @param {String} id Identifiant de l'élément
     * @param {String} value Valeur à lui attribuer
     */
    translateValue(id, value) {
        this.getElement(id).innerHTML = this.currentDictionnary[value];
    }
}