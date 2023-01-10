import { UiController } from "../UiController.js";

export class NoteController extends UiController {
    constructor(uiManager) {
        const domElements = {
            note: {
                element: '.note',
                events: ['click']
            },

            postitList: {
                element: '.note__list'
            }
        };
        super(uiManager, domElements);
        if (this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts) {
            console.log(this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts)
            this.uiRenderer.renderTemplate('postit', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts, 'postitList')
        }
    }

    /**
     * noteHandler() gère les clics sur la section des notes post its
     * @param {Event} ev Evenement au clic
     */
    noteHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'project__return':
                this.savePostIts();
                this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                break;
        }
    }

    /**
     * savePostIts()
     */
    savePostIts() {
        const textAreas = document.querySelectorAll('.postit__textarea');
        let postIts = [];
        for (let i = 0; i < textAreas.length; i++) {
            const postIt = textAreas[i].value;
            postIts.push({
                text: postIt
            })
        }
        this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts = postIts;
    }
}