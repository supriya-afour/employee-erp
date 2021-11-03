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
const chai_1 = __importDefault(require("chai"));
const axios_1 = __importDefault(require("axios"));
const enums_1 = require("../constants/enums");
const validationErrors_1 = require("../constants/validationErrors");
const expect = chai_1.default.expect;
let empId;
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
};
let createbody = {
    first_name: "sidd",
    last_name: "barkund",
    email: "sidd.barkund@gmail.com",
    phone_no: 9061626628,
    level: enums_1.EnumEmployee.DEVELOPER,
    manager: "1",
    dob: "28-07-2006"
};
let putBody = {
    first_name: "vidya",
    last_name: "barkund",
    email: "vidya.barkund@gmail.com",
    phone_no: 9011690890,
    level: enums_1.EnumEmployee.TESTER,
    manager: "1"
};
describe("EmployeeController", () => {
    describe("GET /employees", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it should GET all the employees", () => __awaiter(void 0, void 0, void 0, function* () {
            return axios_1.default.get('http://localhost:3000/employees')
                .then(function (response) {
                const resp_keys = Object.keys(response.data);
                const resp_values = Object.values(response.data);
                expect(response.status).to.be.equal(200);
                expect(response.status).not.to.be.equal(500);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.config.method).to.be.equal("get");
                resp_keys.map((data) => {
                    expect(data).to.be.a('string');
                });
                // resp_values.map((data) => {
                //   expect(data).to.have.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                // })
                expect(response).not.to.be.null;
            })
                .catch(function (error) {
                throw error;
            });
        }));
    }));
    describe("GET /employees/subrdinate/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it should GET subordinates of given employee", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            return axios_1.default.get(`http://localhost:3000/employees/subordinates/${id}`)
                .then(function (response) {
                const resp_data = response.data;
                // console.log("Subordinates array", response.data);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('array');
                resp_data.map((data) => {
                    expect(data.manager).to.be.equal('1');
                });
                expect(response).not.to.be.null;
            })
                .catch(function (error) {
                throw error;
            });
        }));
    }));
    describe("GET /employees/level", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it shoudl get all managers", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("GET", `http://localhost:3000/employees/level`);
            return axios_1.default.get(`http://localhost:3000/employees/level?type=${enums_1.EnumEmployee.MANAGER}`)
                .then((response) => {
                // console.log(response)
                const resp_data = response.data;
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                resp_data.map((data) => {
                    expect(data).to.be.a('object');
                    expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'dob', 'phone_no');
                    expect(data.level).to.be.equal(enums_1.EnumEmployee.MANAGER);
                    expect(data.level).to.not.equal(enums_1.EnumEmployee.DEVELOPER);
                });
                expect(response).not.to.be.null;
            });
        }));
        it("it should get all developers", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("GET", `http://localhost:3000/employees/level`);
            return axios_1.default.get(`http://localhost:3000/employees/level?type=${enums_1.EnumEmployee.DEVELOPER}`)
                .then((response) => {
                // console.log(response)
                const resp_data = response.data;
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                resp_data.map((data) => {
                    expect(data).to.be.a('object');
                    expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                    expect(data.level).to.be.equal(enums_1.EnumEmployee.DEVELOPER);
                    expect(data.level).to.not.equal(enums_1.EnumEmployee.INTERN);
                });
                expect(response).not.to.be.null;
            });
        }));
        it("it should get all testers", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("GET", `http://localhost:3000/employees/level`);
            return axios_1.default.get(`http://localhost:3000/employees/level?type=${enums_1.EnumEmployee.TESTER}`)
                .then((response) => {
                // console.log(response)
                const resp_data = response.data;
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                resp_data.map((data) => {
                    expect(data).to.be.a('object');
                    expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                    expect(data.level).to.be.equal(enums_1.EnumEmployee.TESTER);
                    expect(data.level).to.not.equal(enums_1.EnumEmployee.DEVELOPER);
                });
                expect(response).not.to.be.null;
            });
        }));
        it("it should get all interns", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("GET", `http://localhost:3000/employees/level`);
            return axios_1.default.get(`http://localhost:3000/employees/level?type=${enums_1.EnumEmployee.INTERN}`)
                .then((response) => {
                // console.log(response)
                const resp_data = response.data;
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                resp_data.map((data) => {
                    expect(data).to.be.a('object');
                    expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                    expect(data.level).to.be.equal(enums_1.EnumEmployee.INTERN);
                    expect(data.level).to.not.equal(enums_1.EnumEmployee.DEVELOPER);
                });
                expect(response).not.to.be.null;
            });
        }));
    }));
    describe("POST /employees", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it should POST a employee", () => __awaiter(void 0, void 0, void 0, function* () {
            return axios_1.default.post('http://localhost:3000/employees', createbody, axiosConfig).then((response) => {
                // console.log("Post Employee", response.data);
                expect(response.status).to.be.equal(201);
                expect(response.status).not.to.be.equal(500);
                expect(response.statusText).to.be.equal("Created");
                expect(response.config.method).to.be.equal("post");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                empId = response.data.id;
            }).catch(function (error) {
                throw error;
            });
        }));
        it("it should not POST a employee without first_name", () => __awaiter(void 0, void 0, void 0, function* () {
            const body = {
                "last_name": "barkund",
                "email": "sidd.barkund@gmail.com",
                "phone_no": 9061626628,
                "level": enums_1.EnumEmployee.DEVELOPER,
                "manager": "1",
                "dob": "28-07-2006"
            };
            return axios_1.default.post('http://localhost:3000/employees', body, axiosConfig)
                .then((response) => {
                // console.log("Post Employee without first_name", response);
                // expect(response.status).to.be.equal(400);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.property('error');
                expect(response.data.error).eql(validationErrors_1.constants.FIELD_ERRORS);
            }).catch(function (error) {
                throw error;
            });
        }));
        it("it should not POST a employee with wrong level", () => __awaiter(void 0, void 0, void 0, function* () {
            const body = {
                first_name: "rupesh",
                last_name: "gutal",
                email: "rupesh.gutal@gmail.com",
                phone_no: 9011678909,
                level: "hr",
                manager: "1",
                dob: "28-07-1998"
            };
            return axios_1.default.post('http://localhost:3000/employees', body, axiosConfig)
                .then((response) => {
                // console.log("Post Employee without level", response);
                // expect(response.status).to.be.equal(400);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.property('error');
                expect(response.data.error).eql(validationErrors_1.constants.LEVEL_ERROR);
            }).catch(function (error) {
                throw error;
            });
        }));
        it("it should not POST a employee with phone_no of length 5", () => __awaiter(void 0, void 0, void 0, function* () {
            const body = {
                first_name: "rupesh",
                last_name: "gutal",
                email: "rupesh.gutal@gmail.com",
                phone_no: 90116,
                level: enums_1.EnumEmployee.TESTER,
                manager: "1",
                dob: "28-07-1998"
            };
            return axios_1.default.post('http://localhost:3000/employees', body, axiosConfig)
                .then((response) => {
                // console.log("Post Employee without level", response);
                // expect(response.status).to.be.equal(400);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.property('error');
                expect(response.data.error).eql(validationErrors_1.constants.PHONE_ERROR);
            }).catch(function (error) {
                throw error;
            });
        }));
    }));
    describe("PUT /employees/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it should UPDATE a employee by the given id", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("PUT ", `http://localhost:3000/employees/${empId}`);
            return axios_1.default.put(`http://localhost:3000/employees/${empId}`, putBody)
                .then((response) => {
                // console.log("PUT Employee", response.data);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data.id).to.be.equal(empId);
                expect(response.data.first_name).to.be.equal(putBody.first_name);
                expect(response.data.level).to.be.equal(putBody.level);
            })
                .catch(function (error) {
                throw error;
            });
        }));
        it("it should UPDATE a employee without providing body", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("PUT ", `http://localhost:3000/employees/${empId}`);
            return axios_1.default.put(`http://localhost:3000/employees/${empId}`)
                .then((response) => {
                // console.log("PUT Employee", response);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data.id).to.be.equal(empId);
                expect(response.data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                expect(response.data.first_name).to.be.equal(putBody.first_name);
                expect(response.data.level).to.be.equal(putBody.level);
            })
                .catch(function (error) {
                throw error;
            });
        }));
        it("it should UPDATE a employee with given details only", () => __awaiter(void 0, void 0, void 0, function* () {
            let body = {
                first_name: "shamita",
                email: "shamita@gmail.com"
            };
            console.log("PUT ", `http://localhost:3000/employees/${empId}`);
            return axios_1.default.put(`http://localhost:3000/employees/${empId}`, body)
                .then((response) => {
                // console.log("PUT Employee", response);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data.id).to.be.equal(empId);
                expect(response.data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
                expect(response.data.first_name).to.be.equal(body.first_name);
                expect(response.data.email).to.be.equal(body.email);
                expect(response.data.level).to.be.equal(putBody.level);
            })
                .catch(function (error) {
                throw error;
            });
        }));
    }));
    describe("GET /employees/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it should GET a employee by the given id", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("GET ", `http://localhost:3000/employees/${empId}`);
            return axios_1.default.get(`http://localhost:3000/employees/${empId}`)
                .then((response) => {
                // console.log("GET Employee", response.data);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.property("id");
                expect(response.data.id).to.be.equal(empId);
            })
                .catch(function (error) {
                throw error;
            });
        }));
    }));
    describe("DELETE /employees/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        it("it should DELETE a employee by the given id", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("DELETE ", `http://localhost:3000/employees/${empId}`);
            return axios_1.default.delete(`http://localhost:3000/employees/${empId}`)
                .then((response) => {
                // console.log("DELETED employee ", response);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.property("message");
                expect(response.data.message).to.be.equal("Employee deleted!");
            })
                .catch(function (error) {
                throw error;
            });
        }));
        it("it should not DELETE a manager", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            console.log("DELETE ", `http://localhost:3000/employees/${id}`);
            return axios_1.default.delete(`http://localhost:3000/employees/${id}`)
                .then((response) => {
                // console.log("DELETED employee ", response);
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal("OK");
                expect(response.data).to.be.a('object');
                expect(response.data).to.have.property("error");
                expect(response.data.error).to.be.equal("Can not delete manager");
            })
                .catch(function (error) {
                throw error;
            });
        }));
    }));
});
