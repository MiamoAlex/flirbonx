import { UiController } from "../UiController.js";

export class QuestController extends UiController {

    constructor(uiManager) {
        const domElements = {
            quest: {
                element: '.quest',
                events: ['click', 'keydown']
            },
            questList: {
                element: '.quest__list'
            },
            questProgress: {
                element: '.quest__progress-bar'
            },
            questComplete: {
                element: '.quest__completebutton'
            }
        };
        super(uiManager, domElements);
        if (this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives) {
            this.uiRenderer.renderTemplate('objective', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives, 'questList')
        }
        this.saveObjectives();
    }

    /**
     * questHandler() gère les clics sur la section des quêtes
     * @param {Event} ev Evenement au clic
     */
    questHandler(ev) {
        if (ev.type == 'click') {
            switch (ev.target.classList[0]) {
                case 'project__return':
                    this.saveObjectives();
                    this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                    break;

                case 'quest__addbutton':
                    const projectTask = this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask];
                    projectTask.objectives.push({
                        name: '',
                        difficulty: 'Easy'
                    });
                    this.uiRenderer.renderTemplate('objective', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives, 'questList')
                    this.saveObjectives();
                    break;

                case 'quest__completebutton':
                    this.dataManager.save.projects[this.uiManager.currentProject].tasks.splice(this.uiManager.currentTask, 1);
                    this.uiManager.changeLayout(0, 'Project', this.dataManager.save.projects[this.uiManager.currentProject]);
                    break;

                case 'objective__close':
                    ev.target.parentElement.remove();
                    this.saveObjectives();
                    break;

                case 'objective__checkbox':
                    this.saveObjectives();
                    this.uiRenderer.renderTemplate('objective', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives, 'questList')
                    break;

                case 'objective__icon':
                    const currentObjective = this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives[ev.target.dataset.id];
                    switch (currentObjective.difficulty) {
                        case 'Easy':
                            ev.target.parentElement.dataset.difficulty = 'Medium';
                            break;

                        case 'Medium':
                            ev.target.parentElement.dataset.difficulty = 'Hard';
                            break;

                        case 'Hard':
                            ev.target.parentElement.dataset.difficulty = 'Easy';
                            break;
                    }
                    this.saveObjectives();
                    this.uiRenderer.renderTemplate('objective', this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives, 'questList')
                    break;
            }
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.saveObjectives();
            }, 450);
        }

    }

    /**
     * saveObjectives() sauvegarde les objectifs actuels au rendu
     */
    saveObjectives() {
        const objectives = document.querySelectorAll('.objective');
        let array = [];
        for (let i = 0; i < objectives.length; i++) {
            const objective = objectives[i];
            if (objective.children[1].value) {
                array.push({
                    name: objective.children[1].value,
                    difficulty: objective.dataset.difficulty,
                    checked: objective.children[0].checked ? 'checked' : ''
                });
            }
        }
        this.dataManager.save.projects[this.uiManager.currentProject].tasks[this.uiManager.currentTask].objectives = array;
        let progress = 0;
        array.forEach(obj => {
            if (obj.checked) {
                progress++
            }
        });
        this.uiRenderer.getElement('questProgress').value = progress / array.length * 100;
        this.uiRenderer.getElement('questProgress').nextElementSibling.textContent = `${progress}/${array.length}`;

        if (progress == array.length) {
            this.uiRenderer.getElement('questComplete').style.display = 'block';
        } else {
            this.uiRenderer.getElement('questComplete').style.display = 'none';
        }

    }
}