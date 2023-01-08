import * as Flirbonx from './Flirbonx/index.js';

const App = {
    model: {
        dataManager: Flirbonx.DataManager,
    },

    view: {
        uiRenderer: Flirbonx.UiRenderer,
    },

    controller: {
        uiManager: Flirbonx.UiManager,
        requestManager: Flirbonx.RequestManager,

        // Initialisation de l'application
        init: async function () {
            App.model.dataManager = new Flirbonx.DataManager();
            App.view.uiRenderer = new Flirbonx.UiRenderer();
            App.controller.requestManager = new Flirbonx.RequestManager();
            App.controller.uiManager = new Flirbonx.UiManager(App.model.dataManager, App.view.uiRenderer, App.controller.requestManager);
            App.model.dataManager.save = await App.controller.requestManager.getSave();
        }
    }
}

window.addEventListener('load', App.controller.init);

console.log("%cFlirbonx", "color:#5f73ec; font-size:3rem; font-weight: 1000");
console.log("%cDesigned & Developed by Alexandre Sounalet", "color:#CCC; font-size:.7rem");
