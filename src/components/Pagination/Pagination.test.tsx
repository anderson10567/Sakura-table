import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";
import { expect, test, vi } from "vitest";
import styles from "./Pagination.module.scss"; 

test("рендерит кнопки и вызывает onPageChange", async () => {
  const onPageChange = vi.fn();
  const currentPage = 2;
  const totalPages = 5;

  render(
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  );

  
  const backButton = screen.getByText("Назад");
  expect(backButton).toBeEnabled();

  const forwardButton = screen.getByText("Вперёд");
  expect(forwardButton).toBeEnabled();

  const pageButtons = screen.getAllByRole("button");
  expect(pageButtons.length).toBe(7); 

  
  expect(screen.getByText("2")).toHaveClass(styles.active);

  
  await userEvent.click(screen.getByText("3"));
  expect(onPageChange).toHaveBeenCalledWith(3);

  
  await userEvent.click(backButton);
  expect(onPageChange).toHaveBeenCalledWith(1);


  await userEvent.click(forwardButton);
  expect(onPageChange).toHaveBeenCalledWith(3);
});

test("кнопки 'Назад' и 'Вперёд' отключены на первой и последней странице", async () => {
  const onPageChange = vi.fn();
  const currentPage = 1;
  const totalPages = 5;

  render(
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  );


  const backButton = screen.getByText("Назад");
  expect(backButton).toBeDisabled();

  
  const forwardButton = screen.getByText("Вперёд");
  expect(forwardButton).toBeEnabled();
});
