const addressFile = require("./contractAddress.json");
const boardModel = require("../model/boardModel.json");

class AppSettings {
    constructor() {
        this._contractAddress = addressFile.address;
        this._boardModel = boardModel;
    }
}

const appSettings = new AppSettings();

export default appSettings;