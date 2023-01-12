import { UiController } from "../UiController.js";

export class ProjectController extends UiController {
    constructor(uiManager) {
        const domElements = {
            project: {
                element: '.project',
                events: ['mousedown']
            },
            tasksList: {
                element: '.project__tasks-list'
            },
        };
        super(uiManager, domElements);
        this.renderTasks();
    }

    /**
     * renderTasks() gère le rendu des tâches à l'écran
     */
    renderTasks() {
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
                if (ev.button == 0) {
                    this.uiManager.currentTask = ev.target.dataset.id;
                    this.uiManager.changeLayout(0, ev.target.dataset.task, this.dataManager.save.projects[this.uiManager.currentProject].tasks[ev.target.dataset.id]);
                } else if (ev.button == 2) {
                    this.uiManager.currentTask = ev.target.dataset.id;
                    this.uiManager.changeLayout(0, 'TaskEditor', this.dataManager.save.projects[this.uiManager.currentProject].tasks[ev.target.dataset.id]);
                }
                break;

            case 'task__edit': {
                const task = ev.target.dataset.id;
                this.uiManager.currentTask = task;
                this.uiManager.changeLayout(0, 'TaskEditor', this.dataManager.save.projects[this.uiManager.currentProject].tasks[task]);
            }
                break;

            case 'task__delete': {
                const task = ev.target.dataset.id;
                this.dataManager.save.projects[this.uiManager.currentProject].tasks.splice(task, 1);
                this.renderTasks();
            }
                break;


            case 'project__tasks-add':
                this.uiManager.currentTask = null;
                this.uiManager.changeLayout(0, 'TaskEditor');
                break;
        }
    }
}