// src/employee.interface.ts

import { EnumEmployee } from "../constants/enums";

export interface EmployeeData {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: number;
  level: EnumEmployee;
  manager?: string;
  dob?: string;
}

export interface Employee extends EmployeeData {
  id: number;
}
