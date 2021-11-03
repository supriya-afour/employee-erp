/**
 * Required External Modules and Interfaces
 */
import { EmployeeData, Employee } from "../interfaces/employee.interface";
import FileService from "./FileService.services";
import { EnumEmployee } from "../constants/enums";
import { constants } from "../constants/validationErrors";
import { response } from "express";
export default class EmployeeService {
  private fService: FileService;

  constructor() {
    this.fService = new FileService()
  }

  public getAll = (): Promise<Employee[]> => {
    let emp: Employee[] = [];
    return this.fService.getData()
      .then((jsonData) => {
        return jsonData.filter((data) => data !== null)
      }).then((result) => {
        for (const [key, value] of Object.entries(result)) {
          if (value.level == EnumEmployee.MANAGER) {
            delete value.manager;
          }
          emp[value.id] = value;
        }
        return Object.assign({}, emp);
      }).catch(e => {
        throw e;
      })
  }

  public find = (id: number): Promise<Employee> => {
    return this.fService.getData()
      .then((jsonData) => {
        return jsonData.filter((data) => data.id === id)[0];
      }).catch(e => {
        throw e;
      })
  }

  public create = (newEmployeeData: EmployeeData): Promise<Employee> => {
    return this.fService.getData()
      .then((result) => {
        const id: number = new Date().valueOf();
        const newEmployee = { id, ...newEmployeeData };
        result.push(newEmployee);
        this.fService.setData(result);
        return newEmployee;
      }).catch((e) => {
        throw e;
      })
  };

  public update = async (id: number, employeeUpdate: EmployeeData): Promise<Employee> => {
    return this.fService.getData()
      .then((result) => {
        const index = result.findIndex((data) => data.id === id)
        if (index) {
          result[index] = { ...result[index], ...employeeUpdate }
          this.fService.setData(result)
        }
        return result[index];
      }).catch((e) => {
        throw e;
      })
  };

  public remove = (id: number): Promise<Employee> => {
    return this.fService.getData()
      .then((result) => {
        const emp = result.filter((data) => data.id === id)[0]
        if (emp) {
          this.fService.setData(result.filter((data) => data.id !== id));
        }
        return emp;
      }).catch((e) => {
        throw e;
      })
  };

  public getSubordinate = (id: number): Promise<Employee[]> => {
    return this.fService.getData()
      .then((result) => {
        return result.filter((data) => data.manager === id.toString() && data.level != EnumEmployee.MANAGER)
      }).catch((e) => {
        throw e;
      })
  };

  public getLevel = async (query: string): Promise<Employee[]> => {
    let emp: Employee[] = [];
    return this.fService.getData()
      .then((result) => {
        if (query === EnumEmployee.DEVELOPER) {
          return result.filter((data) => data.level === EnumEmployee.DEVELOPER && data !== null)
        } else if (query === EnumEmployee.INTERN) {
          return result.filter((data) => data.level === EnumEmployee.INTERN && data !== null)
        } else if (query === EnumEmployee.TESTER) {
          return result.filter((data) => data.level === EnumEmployee.TESTER && data !== null)
        } else
          for (const [key, value] of Object.entries(result)) {
            if (value.level == EnumEmployee.MANAGER) {
              delete value.manager;
            }
            emp[value.id] = value;
          }
        return result.filter((data) => data.level === EnumEmployee.MANAGER && data !== null)
      })
    // .then((data) => {
    //   for (const [key, value] of Object.entries(data)) {
    //     emp[value.id] = value;
    //   }
    //   return Object.assign({}, emp);
    // })
  }

  static validator = async (employeeData: any, flow: string): Promise<string> => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg = /^\d{10}$/;
    const nameReg = /^[a-zA-Z ]+$/;
    const enums = Object.values(EnumEmployee)

    if (flow === constants.METHOD_CREATE) {
      if (!employeeData.first_name || !employeeData.last_name || !employeeData.email || !employeeData.phone_no || !employeeData.level || !employeeData.manager) {
        return constants.FIELD_ERRORS;
      }
    }
    if ((employeeData.first_name && !nameReg.test(employeeData.first_name)) || (employeeData.last_name && !nameReg.test(employeeData.last_name))) {
      return constants.FIRST_LAST_NAME;
    }
    if (employeeData.email && !emailReg.test(employeeData.email)) {
      return constants.EMAIL_ERROR;
    }
    if (employeeData.phone_no && !phoneReg.test(employeeData.phone_no)) {
      return constants.PHONE_ERROR;
    }
    if (employeeData.level && !enums.includes(employeeData.level)) {
      return constants.LEVEL_ERROR;
    }
    return '';
  }
}
