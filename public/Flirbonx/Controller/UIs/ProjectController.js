import { UiController } from "../UiController.js";

export class ProjectController extends UiController {
    constructor(uiManager) {
        const domElements = {
            tasksList : {
                element: '.project__tasks'
            }
        };
        super(uiManager, domElements);
        this.uiRenderer.renderTemplate('task', this.uiManager.currentData.tasks, 'tasksList');
    }
}