/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import EmployeeService from "../services/employees.services";
import { EmployeeData, Employee } from "../interfaces/employee.interface";
import FileService from "../services/FileService.services";
import { Employees } from "../interfaces/employeeObject.interface";
import { constants } from "../constants/validationErrors";

const employeeService = new EmployeeService();
/**
* Controller Definitions
*/
export default class EmployeeController {

  private fService: FileService;

  constructor() {
    this.fService = new FileService()
  }

  // GET employees by level
  public getEmployeeLevel = async (req: Request, res: Response) => {
    try {
      const emp = await employeeService.getLevel(req.query.type as string);
      if (emp.length == 0) {
        res.status(404).json({ "Error": `There are no ${req.query.type}` })
      }
      res.status(200).json(emp)
    } catch (e: any) {
      return res.status(500).send(e.message)
    }
  }

  // GET employees
  public getAllEmployees = async (req: Request, res: Response) => {
    try {
      const employees: Employees = await employeeService.getAll();
      if (!employees) {
        return res.status(404).json({ "error": constants.NO_EMPLOYEE });
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
      const employee: Employee = await employeeService.find(id);
      if (employee === undefined || employee === null || Object.keys(employee).length == 0) {
        return res.status(404).json({ "error": constants.NO_EMPLOYEE_FOUND });
      }
      return res.status(200).json(employee);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  // POST employees
  public createEmployee = async (req: Request, res: Response) => {
    const isValidated = await EmployeeService.validator(req.body, constants.METHOD_CREATE)
    if (!isValidated) {
      try {
        const employee: EmployeeData = req.body;
        const newEmp = await employeeService.create(employee);
        return res.status(201).json(newEmp);
      } catch (e: any) {
        return res.status(500).send(e.message);
      }
    } else {
      return res.json({ "error": isValidated });
    }
  }

  // PUT employees/:id
  public editEmployee = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const isValidated = await EmployeeService.validator(req.body, constants.METHOD_EDIT);
    if (!isValidated) {
      try {
        const employeeUpdate: EmployeeData = req.body;
        const newEmp = await employeeService.update(id, employeeUpdate);
        if (!newEmp) {
          return res.status(404).json({ "error": constants.NO_EMPLOYEE_FOUND});
        }
        return res.status(200).json(newEmp);
      } catch (e: any) {
        return res.status(500).send(e.message);
      }
    } else {
      return res.json({ "error": isValidated });
    }
  }

  // DELETE employees/:id
  public deleteEmployee = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      if(id === 1 || id === 2 ){
        return res.json({"error": constants.DELETE_MANAGER_ERROR})
      }
      const employee = await employeeService.remove(id);
      if (!employee) {
        return res.status(404).json({ "error": constants.NO_EMPLOYEE_FOUND});
      }
      return res.status(200).json({ "message": constants.EMPLOYEE_DELETE_ERROR });
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }

  public findSubordinates = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      const employees = await employeeService.getSubordinate(id);
      if (Object.keys(employees).length === 0) {
        return res.status(404).json({ "error": constants.SUBORDINATE_ERROR });
      }
      return res.status(200).json(employees);
    } catch (e: any) {
      return res.status(500).send(e.message)
    }
  }
}
