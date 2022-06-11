import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import counterState from './CounterState';

const CounterSteps = () => (
	<div className="grid">
		<div className="col-12 text-center">
			<strong>Step: {counterState.step}</strong>
		</div>
		<div className="col-12 flex gap-1 align-content-center justify-content-center">
			<Button
				variant="contained"
				onClick={() => counterState.incrementStep()}
				data-testid="incrementStep"
			>
				+
			</Button>
			<Button
				variant="contained"
				onClick={() => counterState.decrementStep()}
				disabled={!counterState.canDecrementStep}
				data-testid="decrementStep"
			>
				-
			</Button>
		</div>
	</div>
);

export default observer(CounterSteps);
