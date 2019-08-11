const addressFile = require("./contractAddress.json");
const boardModel = require("../model/boardModel.json");

class AppSettings {
    constructor() {
        this._contractAddress = addressFile.address;
        this._boardModel = boardModel;
        this._isDevelopment = process.env.NODE_ENV == "development";
    }
}

const appSettings = new AppSettings();

export default appSettings;