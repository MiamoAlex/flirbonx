import * as Questlist from './Questlist/index.js';

const App = {
    model: {
        dataManager: Questlist.DataManager,
    },

    view: {
        uiRenderer: Questlist.UiRenderer,
    },

    controller: {
        uiManager: Questlist.UiManager,

        // Initialisation de l'application
        init: function () {
            App.model.dataManager = new Questlist.DataManager();
            App.view.uiRenderer = new Questlist.UiRenderer();
            App.controller.uiManager = new Questlist.UiManager(App.model.dataManager, App.view.uiRenderer);
        }
    }
}

window.addEventListener('load', App.controller.init);

console.log("%cQuestlist 2", "color:#5f73ec; font-size:3rem; font-weight: 1000");
console.log("%cDesigned & Developed by Alexandre Sounalet", "color:#CCC; font-size:.7rem");
