export class DataManager {
    save = null;

    constructor() {
        // L'utilisateur utilise la sauvegarde locale
        const save = localStorage.getItem('save');
        if (!save) {
            this.save = {
                user: {
                    username: "MiamoAlex",
                    lang: "fr",
                    theme: "dark"
                },
                projects: []
            }
            localStorage.setItem('save', JSON.stringify(this.save));
        } else {
            this.save = JSON.parse(save);
        }
    }

    /**
     * saveData() sauvegarde les données
     */
    saveData() {
        localStorage.setItem('save', JSON.stringify(this.save));
    }

    /**
    * formDataToObject() convertit un objet de type FormData, en objet prêt à être envoyé à l'api en json
    * @param {FormData} formData Données d'un formulaire
    */
    formDataToObject(formData) {
        var obj = {};
        for (const key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    }
}