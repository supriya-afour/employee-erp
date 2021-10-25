"use strict";
// src/employees.service.ts
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
const FileService_services_1 = __importDefault(require("./FileService.services"));
const enums_1 = require("../constants/enums");
class EmployeeService {
    constructor() {
        /**
         *
         */
        this.employees = {
            "1": {
                "id": 1,
                "first_name": "Supriya",
                "last_name": "barkund",
                "email": "supriya@gmail.com",
                "phone_no": 1234567890,
                "level": enums_1.EnumEmployee.MANAGER,
                "reporter": "NA"
            },
            "2": {
                "id": 2,
                "first_name": "sonali",
                "last_name": "barkund",
                "email": "sonali@yahoo.com",
                "phone_no": 1234567890,
                "level": enums_1.EnumEmployee.MANAGER,
                "reporter": "NA"
            }
        };
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // return this.fService.getData();
                return Object.values(this.employees);
            }
            catch (e) {
                throw e;
            }
        });
        this.find = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const allUsers: Employees = await this.fService.getData();
                // return allUsers[id];
                return this.employees[id];
            }
            catch (e) {
                throw e;
            }
        });
        this.create = (newEmployee) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const reporter_name: string = this.employees[parseInt(newEmployee.reporter)]
                // const reporter_name: string = this.employees[parseInt(newEmployee.reporter)].first_name
                const id = new Date().valueOf();
                this.employees[id] = Object.assign({ id }, newEmployee);
                // this.employees[id].reporter = reporter_name;
                return this.employees[id];
            }
            catch (e) {
                throw e;
            }
            // jsonFileData.employeeData.push(employees[id]);
            // let data = JSON.stringify(this.employees[id]);
            // const writeFile: employees = await fs.promises.writeFile("../../employeeData.json", data);
            // return writeFile;
            // const writeFile
            // this.fService.setData(empData);
        });
        this.update = (id, employeeUpdate) => __awaiter(this, void 0, void 0, function* () {
            const item = yield this.find(id);
            // if (!item) {
            //   return null;
            // }
            this.employees[id] = Object.assign({ id }, employeeUpdate);
            return this.employees[id];
        });
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEmployee = yield this.find(id);
                delete this.employees[id];
                return foundEmployee;
            }
            catch (e) {
                throw e;
            }
            // if (!foundEmployee) {
            //   return null;
            // }
            // const emp = this.jsonFileData.employeeData;
            // console.log("Emp1", this.jsonFileData.EmployeeData);
            // delete this.jsonFileData.employeeData.item;
        });
        this.getSubordinate = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                return Object.values(this.employees).filter((data) => data.reporter === id);
            }
            catch (e) {
                throw e;
            }
        });
        this.fService = new FileService_services_1.default();
    }
}
exports.default = EmployeeService;
