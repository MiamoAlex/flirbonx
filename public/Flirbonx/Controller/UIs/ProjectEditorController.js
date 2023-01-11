import { UiController } from "../UiController.js";

export class ProjectEditorController extends UiController {
    constructor(uiManager) {
        const domElements = {
            projecteditor: {
                element: '.projecteditor',
                events: ['click']
            },
            projectForm: {
                element: '.projecteditor__form'
            }
        };
        super(uiManager, domElements);
    }

    /**
     * projecteditorHandler() gère les clics sur l'edtiteur de projets
     * @param {Event} ev Evenement au clic sur l'editeur 
     */
    projecteditorHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'project__return':
                this.uiManager.changeLayout(0, 'Home');
                break;

            case 'projecteditor__submit':
                ev.preventDefault();
                const newProject = this.dataManager.formDataToObject(new FormData(this.uiRenderer.getElement('projectForm')));
                if (!newProject.desc) {
                    newProject.desc = '-'
                }
                newProject.tasks = [];

                if (this.uiManager.currentProject) {
                    this.dataManager.save.projects[this.uiManager.currentProject].name = newProject.name;
                    this.dataManager.save.projects[this.uiManager.currentProject].desc = newProject.desc;
                } else {
                    // Ajout d'un nouveau projet
                    if (newProject.name) {
                        this.dataManager.save.projects.push(newProject);
                    } else {
                        return;
                    }
                }
                this.uiManager.changeLayout(0, 'Home');
                break;

            case 'projecteditor__delete':
                ev.preventDefault();
                if (this.uiManager.currentProject) {
                    this.dataManager.save.projects.splice(this.uiManager.currentProject, 1);
                }
                this.uiManager.changeLayout(0, 'Home');
                break;
        }
    }
}