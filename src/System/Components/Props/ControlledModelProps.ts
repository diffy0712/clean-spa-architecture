import { SyntheticEvent } from "react";

type ControlledModelProps<T, EVENT extends SyntheticEvent = SyntheticEvent> = {
  value?: T;
  onChange?: (eventOrValue: EVENT | T) => void;
};

export default ControlledModelProps;
