"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
class FileService {
    constructor() {
        if (process.env.ENVIRONMENT == "development") {
            this.jsonFile = path_1.default.join(__dirname, "../../employeeData.json");
        }
        this.jsonFile = path_1.default.join(__dirname, "../../testCasesData.json");
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield promises_1.default.readFile(this.jsonFile)
                .then((data) => {
                return JSON.parse(data.toString());
            });
        });
    }
    setData(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            return promises_1.default.writeFile(this.jsonFile, JSON.stringify(inputData));
        });
    }
}
exports.default = FileService;
