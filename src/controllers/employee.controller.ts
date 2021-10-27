/**
 * Required External Modules and Interfaces
 */
import { Request, Response, Router } from "express";
import EmployeeService from "../services/employees.services";
import { EmployeeData, Employee } from "../interfaces/employee.interface";
import { EnumEmployee } from "../constants/enums";
import { Employees } from "../interfaces/employeeObject.interface";

const employeeService = new EmployeeService();
/**
* Controller Definitions
*/
export default class EmployeeController {

  // GET employees
  public getAllEmployees = async (req: Request, res: Response) => {
    try {
      const employees: Employees= await employeeService.getAll();
      if(!employees){
        return res.status(404).json({ "error": "There are no employees in the database." });
      }
      return res.status(200).json(employees);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  // // // GET employees/:id
  public getEmployee = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      const employee = await employeeService.find(id);
      if (employee === undefined || employee === null || Object.keys(employee).length == 0) {
        return res.status(404).json({ "error": `Employee not found with given id ${id}` });
      }
      return res.status(200).json(employee);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  // // // // POST employees
  public createEmployee = async (req: Request, res: Response) => {
    const isValidated = await this.validator(req, res);
    if (!isValidated) {
      try {
        const employee: EmployeeData = req.body;
        await employeeService.create(employee);
        return res.status(201).json({"message": "Employee created"});
      } catch (e: any) {
        return res.status(500).send(e.message);
      }
    }
  }

  // // // PUT employees/:id
  public editEmployee = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const isValidated = await this.validator(req, res);
    if (!isValidated) {
      try {
        const employeeUpdate: Employee = req.body;
        const existingEmployee: Employee = await employeeService.find(id);
        // console.log(existingEmployee);
        if (!existingEmployee) {
          return res.status(404).json({ "error": `Employee not found with given id ${id}` });
        }
        const updatedEmployee = await employeeService.update(id, employeeUpdate);
        return res.status(200).json(updatedEmployee);
        // const newEmployee = await employeeService.create(employeeUpdate);
        // return res.status(201).json(newEmployee);
      } catch (e: any) {
        return res.status(500).send(e.message);
      }
    }
  }

  // // DELETE employees/:id
  public deleteEmployee = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      // const employee = await employeeService.remove(id);
      await employeeService.remove(id);
      // if (!employee) {
        // return res.status(404).json({ "error": `Employee not found with given id ${id}` });
      // }
      return res.status(201).json({ "message": `Employee deleted with id ${id}` });
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  public findSubordinates = async(req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      const employees = await employeeService.getSubordinate(id);
      console.log("employees", employees);
      if(!employees || employees.length == 0) {
        return res.status(404).json({ "error": "There are no employees under this user id" });
      }
      return res.status(200).json(employees);
    } catch(e: any){
      return res.status(500).send(e.message)
    }
  }

  private validator = async(req: Request, res: Response): Promise<boolean> => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg =  /^\d{10}$/;
    const enums = Object.values(EnumEmployee)
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
    if(!enums.includes(req.body.level)) {
      res.status(400).json({ "Error": "Level is not valid" });
      validationError = true;
    }
    return validationError;
  }
}
