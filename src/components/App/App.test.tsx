import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";


test("рендерит заголовок и компоненты", () => {
  render(<App />);

  expect(screen.getByText(/Список сотрудников/)).toBeInTheDocument();

  
  expect(screen.getByPlaceholderText(/поиск/i)).toBeInTheDocument();
  expect(screen.getByText(/Все отделы/)).toBeInTheDocument();
});


test("поиск по имени работает корректно", async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/поиск/i);

 
  fireEvent.change(searchInput, { target: { value: "Иван" } });

  await waitFor(() => {
    expect(screen.getByText("Иван Иванов")).toBeInTheDocument();
  });

 
});

test("фильтр по отделу работает корректно", async () => {
  render(<App />);

  const filterSelect = screen.getByText("Все отделы");

  fireEvent.change(filterSelect, { target: { value: "Маркетинг" } });

  await waitFor(() => {
    
    expect(screen.getByText("Анна Смирнова")).toBeInTheDocument();
  });


});


test("пагинация работает корректно", async () => {
  render(<App />);

  const nextButton = screen.getByText(/Вперёд/i);


  fireEvent.click(nextButton);

  await waitFor(() => {
    
    expect(screen.getByText("Светлана Никифорова")).toBeInTheDocument();
  });

  
  expect(screen.queryByText("Иван Иванов")).not.toBeInTheDocument();
});



