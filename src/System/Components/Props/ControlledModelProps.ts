import { SyntheticEvent } from "react";

type ControlledModelProps<T, EVENT extends SyntheticEvent = SyntheticEvent> = {
  value?: T;
  onChange?: (event: EVENT, value: T) => void;
};

export default ControlledModelProps;
