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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const FileService_services_1 = __importDefault(require("./FileService.services"));
const enums_1 = require("../constants/enums");
const validationErrors_1 = require("../constants/validationErrors");
class EmployeeService {
    constructor() {
        this.getAll = () => {
            let emp = [];
            return this.fService.getData()
                .then((jsonData) => {
                return jsonData.filter((data) => data !== null);
            }).then((result) => {
                for (const [key, value] of Object.entries(result)) {
                    if (value.level == enums_1.EnumEmployee.MANAGER) {
                        delete value.manager;
                    }
                    emp[value.id] = value;
                }
                return Object.assign({}, emp);
            }).catch(e => {
                throw e;
            });
        };
        this.find = (id) => {
            return this.fService.getData()
                .then((jsonData) => {
                return jsonData.filter((data) => data.id === id)[0];
            }).catch(e => {
                throw e;
            });
        };
        this.create = (newEmployeeData) => {
            return this.fService.getData()
                .then((result) => {
                const id = new Date().valueOf();
                const newEmployee = Object.assign({ id }, newEmployeeData);
                result.push(newEmployee);
                this.fService.setData(result);
                return newEmployee;
            }).catch((e) => {
                throw e;
            });
        };
        this.update = (id, employeeUpdate) => __awaiter(this, void 0, void 0, function* () {
            return this.fService.getData()
                .then((result) => {
                const index = result.findIndex((data) => data.id === id);
                if (index) {
                    result[index] = Object.assign(Object.assign({}, result[index]), employeeUpdate);
                    this.fService.setData(result);
                }
                return result[index];
            }).catch((e) => {
                throw e;
            });
        });
        this.remove = (id) => {
            return this.fService.getData()
                .then((result) => {
                const emp = result.filter((data) => data.id === id)[0];
                if (emp) {
                    this.fService.setData(result.filter((data) => data.id !== id));
                }
                return emp;
            }).catch((e) => {
                throw e;
            });
        };
        this.getSubordinate = (id) => {
            return this.fService.getData()
                .then((result) => {
                return result.filter((data) => data.manager === id.toString() && data.level != enums_1.EnumEmployee.MANAGER);
            }).catch((e) => {
                throw e;
            });
        };
        this.getLevel = (query) => __awaiter(this, void 0, void 0, function* () {
            let emp = [];
            return this.fService.getData()
                .then((result) => {
                if (query === enums_1.EnumEmployee.DEVELOPER) {
                    return result.filter((data) => data.level === enums_1.EnumEmployee.DEVELOPER && data !== null);
                }
                else if (query === enums_1.EnumEmployee.INTERN) {
                    return result.filter((data) => data.level === enums_1.EnumEmployee.INTERN && data !== null);
                }
                else if (query === enums_1.EnumEmployee.TESTER) {
                    return result.filter((data) => data.level === enums_1.EnumEmployee.TESTER && data !== null);
                }
                else
                    for (const [key, value] of Object.entries(result)) {
                        if (value.level == enums_1.EnumEmployee.MANAGER) {
                            delete value.manager;
                        }
                        emp[value.id] = value;
                    }
                return result.filter((data) => data.level === enums_1.EnumEmployee.MANAGER && data !== null);
            });
            // .then((data) => {
            //   for (const [key, value] of Object.entries(data)) {
            //     emp[value.id] = value;
            //   }
            //   return Object.assign({}, emp);
            // })
        });
        this.fService = new FileService_services_1.default();
    }
}
exports.default = EmployeeService;
_a = EmployeeService;
EmployeeService.validator = (employeeData, flow) => __awaiter(void 0, void 0, void 0, function* () {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg = /^\d{10}$/;
    const nameReg = /^[a-zA-Z ]+$/;
    const enums = Object.values(enums_1.EnumEmployee);
    if (flow === validationErrors_1.constants.METHOD_CREATE) {
        if (!employeeData.first_name || !employeeData.last_name || !employeeData.email || !employeeData.phone_no || !employeeData.level || !employeeData.manager) {
            return validationErrors_1.constants.FIELD_ERRORS;
        }
    }
    if ((employeeData.first_name && !nameReg.test(employeeData.first_name)) || (employeeData.last_name && !nameReg.test(employeeData.last_name))) {
        return validationErrors_1.constants.FIRST_LAST_NAME;
    }
    if (employeeData.email && !emailReg.test(employeeData.email)) {
        return validationErrors_1.constants.EMAIL_ERROR;
    }
    if (employeeData.phone_no && !phoneReg.test(employeeData.phone_no)) {
        return validationErrors_1.constants.PHONE_ERROR;
    }
    if (employeeData.level && !enums.includes(employeeData.level)) {
        return validationErrors_1.constants.LEVEL_ERROR;
    }
    return '';
});
