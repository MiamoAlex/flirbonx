import { UiController } from "../UiController.js";

export class HomeController extends UiController {
    constructor(uiManager) {
        const domElements = {
            home: {
                element: '.home',
                events: ['click']
            },

            projectsList: {
                element: '.home__projects-list',
            }
        };
        super(uiManager, domElements);
        this.renderCategories();
    }

    /**
     * renderCategories() effectue le rendu des catégories à l'écran
     */
    renderCategories() {
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
                {
                    const project = ev.target.dataset.id;
                    this.uiManager.currentProject = project;
                    this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[project]);
                }
                break;

            case 'category__edit': {
                const project = ev.target.dataset.id;
                this.uiManager.currentProject = project;
                this.uiManager.changeLayout(0, 'ProjectEditor', this.dataManager.save.projects[project]);
            }
                break;

            case 'category__delete': {
                const project = ev.target.dataset.id;
                this.dataManager.save.projects.splice(project, 1);
                this.renderCategories();
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