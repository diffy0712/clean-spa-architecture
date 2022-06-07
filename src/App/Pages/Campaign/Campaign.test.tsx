import { act } from "react-test-renderer";
import { render } from "@testing-library/react";
import CampaignModule from "./CampaignModule";

test("Can render CampaignModule component", () => {
  act(() => {
    render(<CampaignModule />);
  });
});
