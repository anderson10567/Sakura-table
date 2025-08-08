import { useState,useMemo } from "react";
import { type Employee } from "../../types/employee";
import styles from  "./Table.module.scss"

interface Props {
  data: Employee[];
}

type SortKey = keyof Employee;
type SortDirection = "asc" | "desc";

export const Table = ({ data }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };



const sortedData = useMemo(() => {
  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
}, [data, sortKey, sortDirection]);

  const renderSortArrow = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className={styles["table-wrapper"]}>
    <table className={styles["employee-table"]}>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Имя{renderSortArrow("name")}
          </th>
          <th onClick={() => handleSort("position")}>
            Должность{renderSortArrow("position")}
          </th>
          <th onClick={() => handleSort("department")}>
            Отдел{renderSortArrow("department")}
          </th>
          <th onClick={() => handleSort("salary")}>
            Оклад{renderSortArrow("salary")}
          </th>
          <th onClick={() => handleSort("hireDate")}>
            Дата найма{renderSortArrow("hireDate")}
          </th>
        </tr>
      </thead>
      <tbody>
  {sortedData.map((employee) => (
    <tr key={employee.id}>
      <td data-testid={`employee-name-${employee.id}`}>{employee.name}</td>
      <td data-testid={`employee-position-${employee.id}`}>{employee.position}</td>
      <td data-testid={`employee-department-${employee.id}`}>{employee.department}</td>
      <td data-testid={`employee-salary-${employee.id}`}>{employee.salary.toLocaleString("ru-RU")} ₽</td>
      <td data-testid={`employee-hireDate-${employee.id}`}>{new Date(employee.hireDate).toLocaleDateString("ru-RU")}</td>
    </tr>
  ))}
</tbody>
    </table>
    </div>
  );
};


