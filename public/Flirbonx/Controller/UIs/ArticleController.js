import { UiController } from "../UiController.js";

export class ArticleController extends UiController {
    constructor(uiManager) {
        const domElements = {
            news: {
                element: '.article',
                events: ['click']
            }
        };
        super(uiManager, domElements);
    }

    /**
     * newsHandler() gère les clics sur la section des articles
     * @param {Event} ev Clic sur la section des news
     */
    newsHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'project__return':
                this.uiManager.changeLayout(0, 'Home');
                break;
        }
    }
}