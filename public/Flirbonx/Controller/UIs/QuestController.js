import { UiController } from "../UiController.js";

export class QuestController extends UiController {
    constructor(uiManager) {
        const domElements = {
            quest: {
                element: '.quest',
                events: ['click']
            }
        };
        super(uiManager, domElements);
    }

    /**
     * questHandler() gère les clics sur la section des quêtes
     * @param {Event} ev Evenement au clic
     */
    questHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'project__return':
                this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                break;
        }
    }
}