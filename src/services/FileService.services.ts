import dotenv from 'dotenv';
import fs from "fs/promises";
import path from "path";
import { Employees } from "../interfaces/employeeObject.interface";
import { Employee } from "../interfaces/employee.interface";
dotenv.config();

export default class FileService {
  private jsonFile: string;

  constructor() {
    if(process.env.ENVIRONMENT == "development"){
      this.jsonFile = path.join(__dirname, "../../employeeData.json");
    }
    this.jsonFile = path.join(__dirname, "../../testCasesData.json");      
  }

  public async getData(): Promise<Employee[]> {
    return await fs.readFile(this.jsonFile)
      .then((data) => {
        return JSON.parse(data.toString()) as Employee[];
      })
  }

  public async setData(inputData: Employee[]) {
    return fs.writeFile(this.jsonFile, JSON.stringify(inputData))
  }
}
