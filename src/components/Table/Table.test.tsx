import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "./Table";
import type { Employee } from "../../types/employee";
import { expect, test } from "vitest";


const employees: Employee[] = [
  {
    id: 1,
    name: "Иван Иванов",
    position: "Менеджер",
    department: "HR",
    salary: 50000,
    hireDate: "2021-01-01",
  },
  {
    id: 2,
    name: "Андрей Андреев",
    position: "Разработчик",
    department: "Dev",
    salary: 70000,
    hireDate: "2020-03-15",
  },
  {
    id: 3,
    name: "Мария Смирнова",
    position: "Дизайнер",
    department: "Design",
    salary: 60000,
    hireDate: "2022-07-20",
  },
];

test("стрелка сортировки отображается и меняется при клике", () => {
  render(<Table data={employees} />);

 
  const nameHeader = screen.getByRole("columnheader", { name: /имя/i });

 
  expect(nameHeader).toHaveTextContent("Имя ▲");

  
  fireEvent.click(nameHeader);
  expect(nameHeader).toHaveTextContent("Имя ▼");

  fireEvent.click(nameHeader);
  expect(nameHeader).toHaveTextContent("Имя ▲");
});
