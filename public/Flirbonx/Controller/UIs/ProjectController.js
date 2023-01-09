import { UiController } from "../UiController.js";

export class ProjectController extends UiController {
    constructor(uiManager) {
        const domElements = {
            project: {
                element: '.project',
                events: ['click']
            },
            tasksList: {
                element: '.project__tasks-list'
            },
        };
        super(uiManager, domElements);
        if (this.uiManager.currentData.tasks.length > 0) {
            this.uiRenderer.renderTemplate('task', this.uiManager.currentData.tasks, 'tasksList');
        } else {
            this.uiRenderer.translateValue('tasksList', 'projectPlaceholder')
        }
    }

    /**
     * projectHandler() gère les clics sur le composant de la page projet
     * @param {Event} ev Evenement au clic
     */
    projectHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'project__return':
                this.uiManager.changeLayout(0, 'Home');
                break;

            case 'task':
                this.uiManager.changeLayout(0, 'Quest', this.dataManager.save.projects[this.uiManager.currentProject].tasks[ev.target.dataset.id]);
                this.uiManager.currentTask = ev.target.dataset.id;
                break;

            case 'project__tasks-add':
                this.uiManager.changeLayout(0, 'TaskEditor');
                break;
        }
    }
}