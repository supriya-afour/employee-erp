"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules and Interfaces
 */
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const express_1 = require("express");
const empController = new employee_controller_1.default();
/**
 * Router Definition
 */
class EmployeeRouter {
    /**
     *
     */
    constructor() {
        this.router = (0, express_1.Router)();
        this.setRoutes();
    }
    setRoutes() {
        // this.router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        // 	console.log({Method:req.method, Route:req.originalUrl});
        // 	return next();
        // });
        this.router.get(`/level`, empController.getEmployeeLevel);
        this.router.get("/", empController.getAllEmployees);
        this.router.get("/:id", empController.getEmployee);
        this.router.post("/", empController.createEmployee);
        this.router.put("/:id", empController.editEmployee);
        this.router.delete("/:id", empController.deleteEmployee);
        this.router.get("/subordinates/:id", empController.findSubordinates);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = EmployeeRouter;
