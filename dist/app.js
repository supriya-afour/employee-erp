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
exports.App = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser";
const employees_router_1 = __importDefault(require("./routes/employees.router"));
class App {
    constructor() {
        this.initialize = () => __awaiter(this, void 0, void 0, function* () {
            dotenv_1.default.config();
            const PORT = parseInt(process.env.PORT, 10);
            const app = (0, express_1.default)();
            // console.log(process.env.PORT)
            // app.use(bodyParser.urlencoded({ extended: true }));
            // app.use(bodyParser.json());
            app.use(express_1.default.json());
            // First route
            app.get('/', (req, res) => {
                res.send('Hi there, This is Employee ERP System');
            });
            const empRouter = new employees_router_1.default();
            app.use("/employees", empRouter.getRouter());
            app.listen(PORT, () => {
                console.log(`Server running on PORT number ${PORT}`);
            });
        });
    }
}
exports.App = App;
