import { UiController } from "../UiController.js";

export class HomeController extends UiController {
    constructor(uiManager) {
        const domElements = {
            projectsList: {
                element: '.home__projects-list',
                events: ['click']
            }
        };
        super(uiManager, domElements);
        this.uiRenderer.renderTemplate('category', this.dataManager.save.projects, 'projectsList');
    }

    /**
     * projectsListHandler() gère les clics sur la section des projets
     * @param {Event} ev Evenement au clic sur les projets
     */
    projectsListHandler(ev) {
        const project = ev.target.dataset.id;
        if (project) {
            this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[project]);
            this.uiManager.currentProject = project;
        }
    }
}