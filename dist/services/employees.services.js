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
class EmployeeService {
    constructor() {
        /**
         *
         */
        // private employees: Employees = {
        //   "1": {
        //     "id": 1,
        //     "first_name": "Supriya",
        //     "last_name": "barkund",
        //     "email": "supriya@gmail.com",
        //     "phone_no": 1234567890,
        //     "level": EnumEmployee.MANAGER,
        //     "reporter": "NA"
        //   },
        //   "2": {
        //     "id": 2,
        //     "first_name": "sonali",
        //     "last_name": "barkund",
        //     "email": "sonali@yahoo.com",
        //     "phone_no": 1234567890,
        //     "level": EnumEmployee.MANAGER,
        //     "reporter": "NA"
        //   }
        // };
        // private employees: Employee[] = [];
        this.config = [];
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const jsonData = await this.fService.getData();
            //   this.employees = jsonData.filter((record) => record != null && record.manager != "NA");
            //   console.log(typeof Object.assign({}, this.employees));
            //   return Object.assign({}, this.employees);
            //   // return Object.entries(this.employees);
            // } catch (e) {
            //   throw e
            // }
            return this.fService.getData()
                .then((jsonData) => {
                return jsonData.filter((data) => data != null);
            }).then((result) => {
                return Object.assign({}, result);
            }).catch(e => {
                throw e;
            });
        });
        this.find = (id) => __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const allUsers = await this.fService.getData();
            //   // if (allUsers[id] == null || allUsers[id] == undefined) {
            //   //   return []
            //   // } else {
            //   return allUsers[id];
            //   // }
            //   // return this.employees[id]
            // } catch (e) {
            //   throw e;
            // }
            return this.fService.getData()
                .then((jsonData) => {
                return jsonData[id];
            }).catch(e => {
                throw e;
            });
        });
        this.create = (newEmployee) => __awaiter(this, void 0, void 0, function* () {
            // try {
            // const reporter_name: string = this.employees[parseInt(newEmployee.reporter)]
            // const reporter_name: string = this.employees[parseInt(newEmployee.reporter)].first_name
            // const id: number = new Date().valueOf();
            // this.employees[id] = { id, ...newEmployee};
            // this.employees[id].reporter = reporter_name;
            // return this.employees[id];
            // } catch (e) {
            //   throw e;
            // }
            // try {
            //   const jsonData = await this.fService.getData();
            //   const id: number = new Date().valueOf();
            //   const newData = { id, ...newEmployee };
            //   jsonData.push(newData);
            //   this.config = jsonData;
            //   return this.fService.setData(this.config);
            // } catch (e) {
            //   throw e;
            // }
            return this.fService.getData()
                .then((result) => {
                const id = new Date().valueOf();
                const newData = Object.assign({ id }, newEmployee);
                result.push(newData);
                // this.config = result;
                return this.fService.setData(result);
            }).catch((e) => {
                throw e;
            });
        });
        this.update = (id, employeeUpdate) => __awaiter(this, void 0, void 0, function* () {
            // const item = await this.find(id);
            // if (!item) {
            //   return null;
            // }
            // this.employees[id] = { id, ...employeeUpdate };
            // return this.employees[id];
            // try {
            //   const jsonData = await this.fService.getData();
            //   jsonData[id] = { id, ...employeeUpdate };
            //   this.config = jsonData;
            //   return this.fService.setData(this.config);
            // } catch (e) {
            //   throw e;
            // }
            return this.fService.getData()
                .then((result) => {
                result[id] = Object.assign({ id }, employeeUpdate);
                return this.fService.setData(result);
            }).catch((e) => {
                throw e;
            });
        });
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const foundEmployee: Employee = await this.find(id);
            //   delete this.employees[id];
            //   return foundEmployee;
            // } catch (e:any) {
            //   throw e;
            // }
            // try {
            //   const jsonData = await this.fService.getData();
            //   delete jsonData[id];
            //   this.config = jsonData;
            //   return this.fService.setData(this.config.filter((data) => data != null));
            // } catch (e) {
            //   throw e;
            // }
            return this.fService.getData()
                .then((result) => {
                delete result[id];
                return this.fService.setData(result.filter((data) => data != null));
            }).catch((e) => {
                throw e;
            });
        });
        this.getSubordinate = (id) => __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const jsonData = await this.fService.getData();
            //   return jsonData.filter((data) => data.manager == id.toString())
            //   // return Object.values(this.employees).filter((data) => data.reporter === id);
            // } catch (e) {
            //   throw e;
            // }
            return this.fService.getData()
                .then((result) => {
                return Object.assign({}, result.filter((data) => data.manager == id.toString()));
            }).catch((e) => {
                throw e;
            });
        });
        this.fService = new FileService_services_1.default();
    }
}
exports.default = EmployeeService;
