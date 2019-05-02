const addressFile = require("./contractAddress.json");

class AppSettings {
    constructor() {
        this._contractAddress = addressFile.address;
    }
}

const appSettings = new AppSettings();

export default appSettings;