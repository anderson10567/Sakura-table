import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "../components/Table/Table";
import { mockEmployees } from "./mockEmployees"; 
import { expect, test } from "vitest";

test("Таблица рендерится с правильными данными", async () => {
  render(<Table data={mockEmployees} />);

  expect(screen.getByTestId("employee-name-1")).toHaveTextContent("Иван Иванов");
  expect(screen.getByTestId("employee-position-1")).toHaveTextContent("Frontend-разработчик");
  expect(screen.getByTestId("employee-department-1")).toHaveTextContent("ИТ");
  expect(screen.getByTestId("employee-salary-1")).toHaveTextContent(/120 000 ₽/);
  expect(screen.getByTestId("employee-hireDate-1")).toHaveTextContent(/10.05.2020/);
  expect(screen.getByTestId("employee-hireDate-2")).toHaveTextContent(/22.03.2021/);
});

test("Таблица сортируется по имени", () => {
  render(<Table data={mockEmployees} />);

  const nameHeader = screen.getByRole("columnheader", { name: /имя/i });

  expect(nameHeader).toHaveTextContent("Имя ▲");

  
  fireEvent.click(nameHeader);

  expect(nameHeader).toHaveTextContent("Имя ▼");
});
