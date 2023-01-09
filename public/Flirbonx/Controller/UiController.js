/**
 * UiController est une classe gèrant une interface, on y retrouve la déclarations de ses éléments du DOM, ainsi que ses
 * gestionnaires d'évements.
 */
export class UiController {
    // Élements du DOM à déclarer
    domElements = {}

    constructor(uiManager, domElements) {
        this.uiManager = uiManager;
        this.uiRenderer = uiManager.uiRenderer;
        this.dataManager = uiManager.dataManager;
        this.requestManager = uiManager.requestManager;

        this.domElements = domElements;
        this.uiRenderer.appendDomElements(this.domElements);

        // Binding des évenements
        for (const key in this.domElements) {
            const element = this.domElements[key];
            if (element.events) {
                element.events.forEach(event => {
                    if (this[`${key}Handler`]) {
                        this.uiRenderer.getElement(key).addEventListener(event, (ev) => this[`${key}Handler`](ev));
                    }
                });
            }
        }
    }
}