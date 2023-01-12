import { UiController } from "../UiController.js";

export class NoteController extends UiController {
    constructor(uiManager) {
        const domElements = {
            note: {
                element: '.note',
                events: ['click', 'keydown']
            },

            postitList: {
                element: '.note__list',
            }
        };
        super(uiManager, domElements);
        if (this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts) {
            this.uiRenderer.renderTemplate('postit', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts, 'postitList')
        }
    }

    /**
     * noteHandler() gère les clics sur la section des notes post its
     * @param {Event} ev Evenement au clic
     */
    noteHandler(ev) {
        if (ev.type == 'click') {
            switch (ev.target.classList[0]) {
                case 'project__return':
                    this.savePostIts();
                    this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                    break;

                case 'note__addbutton':
                    this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts.push({ text: '', color: 'yellow' });
                    this.uiRenderer.renderTemplate('postit', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts, 'postitList')
                    this.savePostIts();
                    break;

                case 'postit__delete':
                    ev.target.parentElement.parentElement.remove();
                    this.savePostIts();
                    this.uiRenderer.renderTemplate('postit', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts, 'postitList')
                    break;

                case 'postit__custom':
                    ev.target.parentElement.nextElementSibling.classList.add('postit__colors-selected')
                    break;

                case 'postit__textarea':
                    ev.target.nextElementSibling.nextElementSibling.classList.remove('postit__colors-selected')
                    break;

                case 'postit__color':
                    this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts[ev.target.dataset.id].color = ev.target.dataset.color;
                    this.uiRenderer.renderTemplate('postit', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts, 'postitList')
                    this.savePostIts();

                    break;
            }
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.savePostIts();
                this.dataManager.saveData();
            }, 350);
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
            if (postIt) {
                postIts.push({
                    text: postIt,
                    color: textAreas[i].parentElement.dataset.color
                })
            }
        }
        this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].postIts = postIts;
    }
}