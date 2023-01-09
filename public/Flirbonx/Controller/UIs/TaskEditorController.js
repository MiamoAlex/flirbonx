import { UiController } from "../UiController.js";

export class TaskEditorController extends UiController {
    constructor(uiManager) {
        const domElements = {
            taskEditor: {
                element: '.taskeditor',
                events: ['click']
            },
            taskForm: {
                element: '.taskeditor__form'
            }
        };
        super(uiManager, domElements);
    }

    /**
     * taskEditorHandler() gère les clics sur l'edtiteur de projets
     * @param {Event} ev Evenement au clic sur l'editeur 
     */
    taskEditorHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'project__return':
                this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                break;

            case 'taskeditor__submit':
                ev.preventDefault();
                const newTask = this.dataManager.formDataToObject(new FormData(this.uiRenderer.getElement('taskForm')));
                if (newTask.name) {
                    if (!newTask.desc) {
                        newTask.desc = '-'
                    }
                    newTask.type = 'quest';
                    // Ajout d'un nouveau projet
                    this.dataManager.save.projects[this.uiManager.currentProject].tasks.push(newTask);
                    this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                }
                break;

            case 'taskeditor__delete':
                ev.preventDefault();
                if (this.uiManager.currentTask) {
                    this.dataManager.save.projects[this.uiManager.currentProject].tasks.splice(this.uiManager.currentTask, 1);
                }
                this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                break;
        }
    }
}