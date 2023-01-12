import { DataManager, UiRenderer, RequestManager, UiManager } from './Flirbonx/index.js';

const App = {
    model: {
        dataManager: DataManager,
    },

    view: {
        uiRenderer: UiRenderer,
    },

    controller: {
        uiManager: UiManager,
        requestManager: RequestManager,

        // Initialisation de l'application
        init: async function () {
            App.model.dataManager = new DataManager();
            App.view.uiRenderer = new UiRenderer();
            App.controller.requestManager = new RequestManager();
            App.controller.uiManager = new UiManager(App.model.dataManager, App.view.uiRenderer, App.controller.requestManager);

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js', {
                    scope: '.'
                });
            }
        }
    }
}

window.addEventListener('load', App.controller.init);

console.log("%cFonblix", "color:#975add; font-size:3rem; font-weight: 1000");
console.log("%cDesigned & Developed by Alexandre Sounalet", "color:#CCC; font-size:.7rem");
