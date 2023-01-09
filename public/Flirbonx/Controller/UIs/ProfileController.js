import { UiController } from "../UiController.js";

export class ProfileController extends UiController {
    constructor(uiManager) {
        const domElements = {
            profile: {
                element: '.profile',
                events: ['click']
            }
        };
        super(uiManager, domElements);
    }

    /**
     * profileHandler gère les clics sur le profile utilisateur
     * @param {Event} ev Clic sur le profil de l'utilisateur
     */
    profileHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'profile__theme':
                this.dataManager.save.user.theme = ev.target.dataset.theme;
                this.uiManager.setTheme(ev.target.dataset.theme);
                break;

            case 'profile__lang':
                this.dataManager.save.user.lang = ev.target.dataset.lang;
                this.uiManager.changeLanguage(this.dataManager.save.user.lang);
                break;
        }
    }
}