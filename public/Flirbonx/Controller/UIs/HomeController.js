import { UiController } from "../UiController.js";

export class HomeController extends UiController {
    constructor(uiManager) {
        const domElements = {
            home: {
                element: '.home',
                events: ['mousedown']
            },

            projectsList: {
                element: '.home__projects-list',
            }
        };
        super(uiManager, domElements);
        if (this.dataManager.save.projects.length > 0) {
            this.uiRenderer.renderTemplate('category', this.dataManager.save.projects, 'projectsList');
        } else {
            this.uiRenderer.getElement('projectsList').innerHTML = `<li>${this.uiRenderer.translateValue('homePlaceholder')}</li>`
        }
    }

    /**
     * homeHandler() gère les clics sur la page d'accueil
     * @param {Event} ev Evenement au clic sur les projets
     */
    homeHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'category':
                const project = ev.target.dataset.id;
                if (project) {
                    if (ev.button == 0) {
                        this.uiManager.currentProject = project;
                        this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[project]);
                    } else if (ev.button == 2) {
                        this.uiManager.currentProject = project;
                        this.uiManager.changeLayout(0, 'ProjectEditor', this.dataManager.save.projects[project]);
                    }
                }
                break;

            case 'news':
                this.uiManager.changeLayout(0, 'Article', { id: ev.target.dataset.news });
                break;
            case 'home__projects-add':
                this.uiManager.currentProject = null;
                this.uiManager.changeLayout(0, 'ProjectEditor');
                break;
        }
    }
}