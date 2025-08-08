import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./SearchInput";
import { expect, test, vi } from "vitest";

test("вызывает onChange с введённым значением (debounced)", async () => {
  const onChange = vi.fn();

  render(<SearchInput value="" onChange={onChange} />);
  const input = screen.getByPlaceholderText(/поиск/i);

  await userEvent.type(input, "Андрей");

  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith("Андрей");
  });
});
