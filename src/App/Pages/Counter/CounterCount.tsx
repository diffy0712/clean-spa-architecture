import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import counterState from "./CounterState";

const CounterCount = () => (
  <div className="grid">
    <div className="col-12 text-center">
      <strong>Count: {counterState.count}</strong>
    </div>
    <div className="col-12 flex gap-1 align-content-center justify-content-center">
      <Button
        variant="contained"
        onClick={() => counterState.incrementCount()}
        data-testid="incrementCount"
      >
        +
      </Button>
      <Button
        variant="contained"
        onClick={() => counterState.decrementCount()}
        data-testid="decrementCount"
      >
        -
      </Button>
    </div>
  </div>
);

export default observer(CounterCount);
