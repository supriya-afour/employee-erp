
import fs from "fs/promises";
import path from "path";
import { Employee } from "../interfaces/employee.interface";
import { Employees } from "../interfaces/employeeObject.interface";

export default class FileService {
  private jsonFile: string;
  // private jsonFileData: any;

  constructor() {
    this.jsonFile = path.join(__dirname, "../../employeeData.json");
    // this.jsonFileData = require(this.jsonFile);    
  }

  public async getData(): Promise<Employee[]> {
    return await fs.readFile(this.jsonFile)
      .then((data) => {
        return JSON.parse(data.toString()) as Employee[];
      })

  }

  public async setData(inputData: Employee[]) {
    console.log("Inside setData:", JSON.stringify(inputData));
    return await fs.writeFile(this.jsonFile, JSON.stringify(inputData))
  }
}
