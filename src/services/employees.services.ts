// src/employees.service.ts

/**
 * Required External Modules and Interfaces
 */
import e from "express";
import { EmployeeData, Employee } from "../interfaces/employee.interface";
import FileService from "./FileService.services";
import { Employees } from "../interfaces/employeeObject.interface";
export default class EmployeeService {
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
  // private config: Employee[] = [];
  private fService: FileService;

  constructor() {
    this.fService = new FileService()
  }

  public getAll = async (): Promise<Employee[]> => {
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
        return jsonData.filter((data) => data != null)
      }).then((result) => {
        return Object.assign({}, result);
      }).catch(e => {
        throw e;
      })
  }

  public find = async (id: number): Promise<Employee> => {
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
      })
  }

  public create = async (newEmployee: EmployeeData): Promise<void> => {
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
        const id: number = new Date().valueOf();
        const newData = { id, ...newEmployee };
        result.push(newData);
        // this.config = result;
        return this.fService.setData(result);
      }).catch((e) => {
        throw e;
      })
  };

  public update = async (id: number, employeeUpdate: EmployeeData): Promise<void> => {
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
        result[id] = { id, ...employeeUpdate };
        return this.fService.setData(result)
      }).catch((e) => {
        throw e;
      })
  };

  public remove = async (id: number): Promise<void> => {
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
        delete result[id]
        return this.fService.setData(result.filter((data) => data != null));
      }).catch((e) => {
        throw e;
      })
  };

  public getSubordinate = async (id: number): Promise<Employee[]> => {
    // try {
    //   const jsonData = await this.fService.getData();
    //   return jsonData.filter((data) => data.manager == id.toString())
    //   // return Object.values(this.employees).filter((data) => data.reporter === id);
    // } catch (e) {
    //   throw e;
    // }

    return this.fService.getData()
      .then((result) => {
        return Object.assign({}, result.filter((data) => data.manager == id.toString()))
      }).catch((e) => {
        throw e;
      })
  };
}
