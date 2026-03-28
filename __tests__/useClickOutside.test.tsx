import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { describe, expect, it } from "vitest";
import { useClickOutside } from "@/hooks/useClickOutside";

function Harness() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  useClickOutside(ref, () => setOpen(false), open);
  return (
    <div>
      <div data-testid="outside">outside</div>
      <div ref={ref} data-testid="inside">
        inside
      </div>
      <span data-testid="state">{open ? "open" : "closed"}</span>
    </div>
  );
}

describe("useClickOutside", () => {
  it("calls handler when mousedown occurs outside ref", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.getByTestId("state")).toHaveTextContent("open");
    await user.click(screen.getByTestId("outside"));
    expect(screen.getByTestId("state")).toHaveTextContent("closed");
  });

  it("does not close when clicking inside ref", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByTestId("inside"));
    expect(screen.getByTestId("state")).toHaveTextContent("open");
  });
});
