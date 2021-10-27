"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class FileService {
    // private jsonFileData: any;
    constructor() {
        this.jsonFile = path_1.default.join(__dirname, "../../employeeData.json");
        // this.jsonFileData = require(this.jsonFile);    
    }
    getData() {
        return promises_1.default.readFile(this.jsonFile).then((data) => JSON.parse(data.toString()));
    }
    setData(inputData) {
        console.log("Inside setData:", JSON.stringify(inputData));
        return promises_1.default.writeFile(this.jsonFile, JSON.stringify(inputData));
    }
}
exports.default = FileService;
