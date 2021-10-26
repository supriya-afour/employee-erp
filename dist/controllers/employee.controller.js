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
const enums_1 = require("../constants/enums");
const employeeService = new employees_services_1.default();
/**
* Controller Definitions
*/
class EmployeeController {
    constructor() {
        // GET employees
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield employeeService.getAll();
                if (Object.keys(employees).length == 0) {
                    return res.status(404).json({ "error": "There are no employees in the database." });
                }
                return res.status(200).json(employees);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        // // GET employees/:id
        this.getEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            try {
                const employee = yield employeeService.find(id);
                if (employee === undefined || employee === null) {
                    return res.status(404).json({ "error": `Employee not found with given id ${id}` });
                }
                return res.status(200).json(employee);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        // // // POST employees
        this.createEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const isValidated = yield this.validator(req, res);
            if (!isValidated) {
                try {
                    const employee = req.body;
                    yield employeeService.create(employee);
                    return res.status(201).json({ "message": "Employee created" });
                }
                catch (e) {
                    return res.status(500).send(e.message);
                }
            }
        });
        // // PUT employees/:id
        this.editEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const isValidated = yield this.validator(req, res);
            if (!isValidated) {
                try {
                    const employeeUpdate = req.body;
                    const existingEmployee = yield employeeService.find(id);
                    // console.log(existingEmployee);
                    if (!existingEmployee) {
                        return res.status(404).json({ "error": `Employee not found with given id ${id}` });
                    }
                    const updatedEmployee = yield employeeService.update(id, employeeUpdate);
                    return res.status(200).json(updatedEmployee);
                    // const newEmployee = await employeeService.create(employeeUpdate);
                    // return res.status(201).json(newEmployee);
                }
                catch (e) {
                    return res.status(500).send(e.message);
                }
            }
        });
        // DELETE employees/:id
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                // const employee: Employee = await employeeService.remove(id);
                yield employeeService.remove(id);
                // if (!employee) {
                // return res.status(404).json({ "error": `Employee not found with given id ${id}` });
                // }
                return res.status(201).json({ "message": `Employee deleted with id ${id}` });
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        this.findSubordinates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const employees = yield employeeService.getSubordinate(id);
                console.log("employees", employees);
                if (!employees || employees.length == 0) {
                    return res.status(404).json({ "error": "There are no employees under this user id" });
                }
                return res.status(200).json(employees);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
        this.validator = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const phoneReg = /^\d{10}$/;
            const enums = Object.values(enums_1.EnumEmployee);
            let validationError = false;
            if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_no || !req.body.level || !req.body.manager) {
                res.status(400).json({ "Error": "Please pass all required attributes in the body" });
                validationError = true;
            }
            if (!emailReg.test(req.body.email)) {
                res.status(400).json({ "Error": "email is not valid" });
                validationError = true;
            }
            if (!phoneReg.test(req.body.phone_no)) {
                res.status(400).json({ "Error": "Phone no is not valid" });
                validationError = true;
            }
            if (!enums.includes(req.body.level)) {
                res.status(400).json({ "Error": "Level is not valid" });
                validationError = true;
            }
            return validationError;
        });
    }
}
exports.default = EmployeeController;
