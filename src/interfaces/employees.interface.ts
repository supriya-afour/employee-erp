// src/employees.interface.ts

import { Employee } from "./employee.interface";

export interface Employees {
  [key: number]: Employee;
}
