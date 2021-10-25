
import fs from "fs/promises";
import path from "path";
import { Employees } from "../interfaces/employees.interface";
import { EmployeeData, Employee } from "../interfaces/employee.interface";

export default class FileService{
  private jsonFile: string;
  // private jsonFileData: any;

  constructor(){
    this.jsonFile = path.join(__dirname, "../../employeeData.json");
    // this.jsonFileData = require(this.jsonFile);    
  }

  public getData(): Promise<Employees> {
    return fs.readFile(this.jsonFile).then((data) => JSON.parse(data.toString()) as Employees)
  }

  public setData(inputData:Employee){
    console.log("Inside setData:", JSON.stringify(inputData));
    fs.writeFile(this.jsonFile, JSON.stringify(inputData))
    // this.jsonFileData.push(JSON.stringify(inputData));
  }
}