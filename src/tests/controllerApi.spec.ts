import chai from "chai";
import axios from "axios";
import { EnumEmployee } from "../constants/enums";
import { EmployeeData } from "../interfaces/employee.interface";
import { constants } from "../constants/validationErrors";
import { Employee } from "../interfaces/employee.interface";

const expect = chai.expect;
let empId: number;
let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
};

let createbody: EmployeeData = {
  first_name: "sidd",
  last_name: "barkund",
  email: "sidd.barkund@gmail.com",
  phone_no: 9061626628,
  level: EnumEmployee.DEVELOPER,
  manager: "1",
  dob: "28-07-2006"
}

let putBody: EmployeeData = {
  first_name: "vidya",
  last_name: "barkund",
  email: "vidya.barkund@gmail.com",
  phone_no: 9011690890,
  level: EnumEmployee.TESTER,
  manager: "1"
}
describe("EmployeeController", () => {

  describe("GET /employees", async () => {
    it("it should GET all the employees", async () => {
      return axios.get('http://localhost:3000/employees')
        .then(function (response) {
          const resp_keys = Object.keys(response.data);
          const resp_values: Employee[] = Object.values(response.data);
          expect(response.status).to.be.equal(200);
          expect(response.status).not.to.be.equal(500);
          expect(response.statusText).to.be.equal("OK");
          expect(response.data).to.be.a('object');
          expect(response.config.method).to.be.equal("get");
          resp_keys.map((data) => {
            expect(data).to.be.a('string')
          })
          // resp_values.map((data) => {
          //   expect(data).to.have.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
          // })
          expect(response).not.to.be.null
        })
        .catch(function (error) {
          throw error;
        })
    })
  })

  describe("GET /employees/subrdinate/:id", async () => {
    it("it should GET subordinates of given employee", async () => {
      const id: number = 1;
      return axios.get(`http://localhost:3000/employees/subordinates/${id}`)
        .then(function (response) {
          const resp_data: Employee[] = response.data;
          // console.log("Subordinates array", response.data);
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK");
          expect(response.data).to.be.a('array');
          resp_data.map((data) => {
            expect(data.manager).to.be.equal('1');
          })
          expect(response).not.to.be.null
        })
        .catch(function (error) {
          throw error;
        })
    })
  })

  describe("GET /employees/level", async() => {
    it("it shoudl get all managers", async() => {
      console.log("GET", `http://localhost:3000/employees/level`)
      return axios.get(`http://localhost:3000/employees/level?type=${EnumEmployee.MANAGER}`)
        .then((response) => {
          // console.log(response)
          const resp_data: Employee[] = response.data;
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK");
          resp_data.map((data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'dob', 'phone_no');
            expect(data.level).to.be.equal(EnumEmployee.MANAGER)
            expect(data.level).to.not.equal(EnumEmployee.DEVELOPER)
          })
          expect(response).not.to.be.null
        })
    })

    it("it should get all developers", async() => {
      console.log("GET", `http://localhost:3000/employees/level`)
      return axios.get(`http://localhost:3000/employees/level?type=${EnumEmployee.DEVELOPER}`)
        .then((response) => {
          // console.log(response)
          const resp_data: Employee[] = response.data;
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK");
          resp_data.map((data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
            expect(data.level).to.be.equal(EnumEmployee.DEVELOPER)
            expect(data.level).to.not.equal(EnumEmployee.INTERN)
          })
          expect(response).not.to.be.null
        })
    })

    it("it should get all testers", async() => {
      console.log("GET", `http://localhost:3000/employees/level`)
      return axios.get(`http://localhost:3000/employees/level?type=${EnumEmployee.TESTER}`)
        .then((response) => {
          // console.log(response)
          const resp_data: Employee[] = response.data;
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK");
          resp_data.map((data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
            expect(data.level).to.be.equal(EnumEmployee.TESTER)
            expect(data.level).to.not.equal(EnumEmployee.DEVELOPER)
          })
          expect(response).not.to.be.null
        })
    })

    it("it should get all interns", async() => {
      console.log("GET", `http://localhost:3000/employees/level`)
      return axios.get(`http://localhost:3000/employees/level?type=${EnumEmployee.INTERN}`)
        .then((response) => {
          // console.log(response)
          const resp_data: Employee[] = response.data;
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK");
          resp_data.map((data) => {
            expect(data).to.be.a('object');
            expect(data).to.have.all.keys('id', 'first_name', 'last_name', 'email', 'level', 'manager', 'dob', 'phone_no');
            expect(data.level).to.be.equal(EnumEmployee.INTERN)
            expect(data.level).to.not.equal(EnumEmployee.DEVELOPER)
          })
          expect(response).not.to.be.null
        })
    })
 })

  describe("POST /employees", async () => {
    it("it should POST a employee", async () => {
     
      return axios.post('http://localhost:3000/employees', createbody, axiosConfig).then((response) => {
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
      })
    })

    it("it should not POST a employee without first_name", async () => {
      const body = {
        "last_name": "barkund",
        "email": "sidd.barkund@gmail.com",
        "phone_no": 9061626628,
        "level": EnumEmployee.DEVELOPER,
        "manager": "1",
        "dob": "28-07-2006"
      }
      return axios.post('http://localhost:3000/employees', body, axiosConfig)
        .then((response) => {
          // console.log("Post Employee without first_name", response);
          // expect(response.status).to.be.equal(400);
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK")
          expect(response.data).to.be.a('object')
          expect(response.data).to.have.property('error')
          expect(response.data.error).eql(constants.FIELD_ERRORS)
        }).catch(function (error) {
          throw error;
        })
    })

    it("it should not POST a employee with wrong level", async () => {
      const body = {
        first_name: "rupesh",
        last_name: "gutal",
        email: "rupesh.gutal@gmail.com",
        phone_no: 9011678909,
        level: "hr",
        manager: "1",
        dob: "28-07-1998"
      }
      return axios.post('http://localhost:3000/employees', body, axiosConfig)
        .then((response) => {
          // console.log("Post Employee without level", response);
          // expect(response.status).to.be.equal(400);
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK")
          expect(response.data).to.be.a('object')
          expect(response.data).to.have.property('error')
          expect(response.data.error).eql(constants.LEVEL_ERROR)
        }).catch(function (error) {
          throw error;
        })
    })

    it("it should not POST a employee with phone_no of length 5", async () => {
      const body = {
        first_name: "rupesh",
        last_name: "gutal",
        email: "rupesh.gutal@gmail.com",
        phone_no: 90116,
        level: EnumEmployee.TESTER,
        manager: "1",
        dob: "28-07-1998"
      }
      return axios.post('http://localhost:3000/employees', body, axiosConfig)
        .then((response) => {
          // console.log("Post Employee without level", response);
          // expect(response.status).to.be.equal(400);
          expect(response.status).to.be.equal(200);
          expect(response.statusText).to.be.equal("OK")
          expect(response.data).to.be.a('object')
          expect(response.data).to.have.property('error')
          expect(response.data.error).eql(constants.PHONE_ERROR)
        }).catch(function (error) {
          throw error;
        })
    })
  })

  describe("PUT /employees/:id", async () => {
    it("it should UPDATE a employee by the given id", async () => {
      console.log("PUT ", `http://localhost:3000/employees/${empId}`);
      return axios.put(`http://localhost:3000/employees/${empId}`, putBody)
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
        })
    })

    it("it should UPDATE a employee without providing body", async () => {
      console.log("PUT ", `http://localhost:3000/employees/${empId}`);
      return axios.put(`http://localhost:3000/employees/${empId}`)
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
        })
    })

    it("it should UPDATE a employee with given details only", async () => {
      let body = {
        first_name: "shamita",
        email: "shamita@gmail.com"
      }
      console.log("PUT ", `http://localhost:3000/employees/${empId}`);
      return axios.put(`http://localhost:3000/employees/${empId}`, body)
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
        })
    })
  })

  describe("GET /employees/:id", async () => {
    it("it should GET a employee by the given id", async () => {
      console.log("GET ", `http://localhost:3000/employees/${empId}`);
      return axios.get(`http://localhost:3000/employees/${empId}`)
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
        })
    })
  })

  describe("DELETE /employees/:id", async () => {
    it("it should DELETE a employee by the given id", async () => {
      console.log("DELETE ", `http://localhost:3000/employees/${empId}`);
      return axios.delete(`http://localhost:3000/employees/${empId}`)
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
        })
    })

    it("it should not DELETE a manager", async () => {
      const id: number = 1;
      console.log("DELETE ", `http://localhost:3000/employees/${id}`);
      return axios.delete(`http://localhost:3000/employees/${id}`)
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
        })
    })
  });  

})
