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
const employees_services_1 = __importDefault(require("../services/employees.services"));
const FileService_services_1 = __importDefault(require("../services/FileService.services"));
const validationErrors_1 = require("../constants/validationErrors");
const employeeService = new employees_services_1.default();
/**
* Controller Definitions
*/
class EmployeeController {
    constructor() {
        // GET employees by level
        this.getEmployeeLevel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const emp = yield employeeService.getLevel(req.query.type);
                if (emp.length == 0) {
                    res.status(404).json({ "Error": `There are no ${req.query.type}` });
                }
                res.status(200).json(emp);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        // GET employees
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield employeeService.getAll();
                if (!employees) {
                    return res.status(404).json({ "error": validationErrors_1.constants.NO_EMPLOYEE });
                }
                return res.status(200).json(employees);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        // // // GET employees/:id
        this.getEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            try {
                const employee = yield employeeService.find(id);
                if (employee === undefined || employee === null || Object.keys(employee).length == 0) {
                    return res.status(404).json({ "error": validationErrors_1.constants.NO_EMPLOYEE_FOUND });
                }
                return res.status(200).json(employee);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        // POST employees
        this.createEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const isValidated = yield employees_services_1.default.validator(req.body, validationErrors_1.constants.METHOD_CREATE);
            if (!isValidated) {
                try {
                    const employee = req.body;
                    const newEmp = yield employeeService.create(employee);
                    return res.status(201).json(newEmp);
                }
                catch (e) {
                    return res.status(500).send(e.message);
                }
            }
            else {
                return res.json({ "error": isValidated });
            }
        });
        // PUT employees/:id
        this.editEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const isValidated = yield employees_services_1.default.validator(req.body, validationErrors_1.constants.METHOD_EDIT);
            if (!isValidated) {
                try {
                    const employeeUpdate = req.body;
                    const newEmp = yield employeeService.update(id, employeeUpdate);
                    if (!newEmp) {
                        return res.status(404).json({ "error": validationErrors_1.constants.NO_EMPLOYEE_FOUND });
                    }
                    return res.status(200).json(newEmp);
                }
                catch (e) {
                    return res.status(500).send(e.message);
                }
            }
            else {
                return res.json({ "error": isValidated });
            }
        });
        // DELETE employees/:id
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                console.log("ididid", id);
                if (id === 1 || id === 2) {
                    return res.json({ "error": "Can not delete manager" });
                }
                const employee = yield employeeService.remove(id);
                if (!employee) {
                    return res.status(404).json({ "error": validationErrors_1.constants.NO_EMPLOYEE_FOUND });
                }
                return res.status(200).json({ "message": validationErrors_1.constants.EMPLOYEE_DELETE_ERROR });
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        this.findSubordinates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const employees = yield employeeService.getSubordinate(id);
                if (Object.keys(employees).length === 0) {
                    return res.status(404).json({ "error": validationErrors_1.constants.SUBORDINATE_ERROR });
                }
                return res.status(200).json(employees);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        this.fService = new FileService_services_1.default();
    }
}
exports.default = EmployeeController;
