

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "./Filter";
import { expect, test, vi } from "vitest";

test("рендерит все департаменты и вызывает onChange при выборе", async () => {
  const onChange = vi.fn();
  const departments = ["HR", "Dev", "Design"];
  render(<Filter departments={departments} selected="" onChange={onChange} />);


  for (const dep of departments) {
    expect(screen.getByText(dep)).toBeInTheDocument();
  }

  await userEvent.selectOptions(screen.getByRole("combobox"), "Dev");

  expect(onChange).toHaveBeenCalledWith("Dev");
});
