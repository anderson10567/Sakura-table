import { useMemo } from "react";
import { type Employee } from "../types/employee";

export function useEmployeeFilter(
  employees: Employee[],
  search: string,
  department: string
): Employee[] {
  return useMemo(() => {
    return employees.filter((employee) => {
      const matchSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.position.toLowerCase().includes(search.toLowerCase());

      const matchDepartment =
        department === "" || employee.department === department;

      return matchSearch && matchDepartment;
    });
  }, [employees, search, department]);
}
