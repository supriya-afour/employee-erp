/**
 * Required External Modules and Interfaces
 */
import EmployeeController from "../controllers/employee.controller"
import { Router } from "express";

const empController = new EmployeeController();

/**
 * Router Definition
 */

export default class EmployeeRouter {

  private router: Router;
  /**
   *
   */
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get("/", empController.getAllEmployees);
    this.router.get("/:id", empController.getEmployee);
    this.router.post("/", empController.createEmployee);
    this.router.put("/:id", empController.editEmployee);
    this.router.delete("/:id", empController.deleteEmployee);
    this.router.get("/subordinates/:id", empController.findSubordinates);
  }

  public getRouter() {
    return this.router;
  }
}
