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
            },
            taskTypeDescription: {
                element: '.taskeditor__description',
            },
            taskButton: {
                element: '.taskeditor__submit'
            }
        };
        super(uiManager, domElements);
        if (this.uiManager.currentTask) {
            this.taskReference = this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask];
            document.querySelector(`[data-type="${this.taskReference.type}"]`).click();
        }
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

            // Création / Modification de la tâche
            case 'taskeditor__submit':
                ev.preventDefault();
                const newTask = this.dataManager.formDataToObject(new FormData(this.uiRenderer.getElement('taskForm')));
                const currentTasks = this.dataManager.save.projects[this.uiManager.currentProject].tasks;
                if (newTask.name) {
                    // Description par défaut
                    if (!newTask.desc) {
                        newTask.desc = '-'
                    }
                    // Si aucun type n'a été selectinoné pour la tâche
                    if (!this.selectedType) {
                        return;
                    }
                    newTask.type = this.selectedType;
                    switch (newTask.type) {
                        case 'Note':
                            newTask.postIts = [];
                            break;
                        case 'Quest':
                            newTask.objectives = [];
                            break;
                    }

                    if (this.taskReference) {
                        // Modification d'une tâche existante
                        currentTasks[this.uiManager.currentTask].name = newTask.name;
                        currentTasks[this.uiManager.currentTask].desc = newTask.desc;
                        currentTasks[this.uiManager.currentTask].type = newTask.type;
                        this.uiManager.changeLayout(0, newTask.type, this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask]);
                    } else {
                        // Ajout d'une nouvelle tâche
                        currentTasks.push(newTask);
                        this.uiManager.currentTask = currentTasks.length - 1;
                        this.uiManager.changeLayout(0, newTask.type, this.dataManager.save.projects[this.uiManager.currentProject].tasks[currentTasks.length - 1]);
                    }
                }
                break;

            // Choix du type de la tâche
            case 'taskeditor__item':
                if (ev.target.dataset.type) {
                    if (this.currentType) {
                        this.currentType.classList.remove('taskeditor__selected');
                    }
                    this.uiRenderer.getElement('taskButton').classList.remove('greyed');
                    this.currentType = ev.target;
                    this.currentType.classList.add('taskeditor__selected');
                    this.uiRenderer.translateValue('taskTypeDescription', `${ev.target.dataset.type}Desc`);
                    this.selectedType = ev.target.dataset.type;
                }
                break;

            // Suppression d'une tâche
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