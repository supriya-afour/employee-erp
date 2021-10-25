// src/employees.service.ts

/**
 * Required External Modules and Interfaces
 */
import { EmployeeData, Employee } from "../interfaces/employee.interface";
import { Employees } from "../interfaces/employees.interface";
import FileService from "./FileService.services";
import path from "path";
import fs from "fs";
import { EnumEmployee } from "../constants/enums";

export default class EmployeeService {
  /**
   *
   */
  private employees: Employees = {
    "1": {
      "id": 1,
      "first_name": "Supriya",
      "last_name": "barkund",
      "email": "supriya@gmail.com",
      "phone_no": 1234567890,
      "level": EnumEmployee.MANAGER,
      "reporter": "NA"
    },
    "2": {
      "id": 2,
      "first_name": "sonali",
      "last_name": "barkund",
      "email": "sonali@yahoo.com",
      "phone_no": 1234567890,
      "level": EnumEmployee.MANAGER,
      "reporter": "NA"
    }
  };

  private fService: FileService;

  constructor() {
    this.fService = new FileService()
  }

  public getAll = async (): Promise<Employees[]> => {
    try {
      // return this.fService.getData();
      return Object.values(this.employees);
    } catch (e: any) {
      throw e
    }
  }

  public find = async (id: number): Promise<Employee> => {
    try {
      // const allUsers: Employees = await this.fService.getData();
      // return allUsers[id];
      return this.employees[id]
    } catch (e) {
      throw e;
    }
  }

  public create = async (newEmployee: EmployeeData): Promise<Employee> => {
    try {
      // const reporter_name: string = this.employees[parseInt(newEmployee.reporter)]
      // const reporter_name: string = this.employees[parseInt(newEmployee.reporter)].first_name
      const id: number = new Date().valueOf();
      this.employees[id] = { id, ...newEmployee};
      // this.employees[id].reporter = reporter_name;
      return this.employees[id];
    } catch (e) {
      throw e;
    }
    // jsonFileData.employeeData.push(employees[id]);
    // let data = JSON.stringify(this.employees[id]);
    // const writeFile: employees = await fs.promises.writeFile("../../employeeData.json", data);
    // return writeFile;
    // const writeFile
    // this.fService.setData(empData);
  };

  public update = async (id: number, employeeUpdate: EmployeeData): Promise<Employee | null> => {
    const item = await this.find(id);
    // if (!item) {
    //   return null;
    // }
    this.employees[id] = { id, ...employeeUpdate };
    return this.employees[id];
  };

  public remove = async (id: number): Promise<Employee> => {
    try {
      const foundEmployee: Employee = await this.find(id);
      delete this.employees[id];
      return foundEmployee;
    } catch (e:any) {
      throw e;
    }
    // if (!foundEmployee) {
    //   return null;
    // }
    // const emp = this.jsonFileData.employeeData;
    // console.log("Emp1", this.jsonFileData.EmployeeData);
    // delete this.jsonFileData.employeeData.item;
  };

  public getSubordinate = async (id: number): Promise<Employees[]> => {
    try {
      return Object.values(this.employees).filter((data) => data.reporter === id);
    } catch (e) {
      throw e;
    }
  };
}
