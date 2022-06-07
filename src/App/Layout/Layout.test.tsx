import { act } from "react-test-renderer";
import { render } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout tests", () => {
  test("Check if component renders and calls methods", () => {
    act(() => {
      render(<Layout />);
    });
  });

  // TODO: test if navigation is drawn
  // TODO: test if content is drawn
})