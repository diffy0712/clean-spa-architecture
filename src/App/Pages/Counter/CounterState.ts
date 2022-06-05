import { action, computed, makeObservable, observable } from "mobx";

class CounterState {
  @observable
  protected _count: number = 0;

  @computed
  get count(): number {
    return this._count;
  }

  @action
  setCount(count: number): void {
    this._count = count;
  }

  @action
  incrementCount() {
    this._count += this._step;
  }

  @action
  decrementCount() {
    this._count -= this._step;
  }

  @observable
  protected _step: number = 1;

  get step(): number {
    return this._step;
  }

  @action
  setStep(step: number): void {
    this._step = step;
  }

  get canDecrementStep(): boolean {
    return this._step > 0;
  }

  @action
  incrementStep() {
    this._step += 1;
  }

  @action
  decrementStep() {
    if (this._step <= 0) {
      return;
    }

    this._step -= 1;
  }

  constructor() {
    makeObservable(this);
  }
}

export default new CounterState();
