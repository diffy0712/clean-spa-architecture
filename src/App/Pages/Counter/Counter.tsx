import CounterCount from './CounterCount';
import CounterSteps from './CounterSteps';
import FadeInOut from '@System/Components/Animations/FadeInOut/FadeInOut';
import { Alert } from '@mui/material';

const Counter = () => {
	return (
		<FadeInOut>
			<Alert severity="info">
				Count will be increased or decreased by the value of `step`.
			</Alert>
			<div className="flex flex-column gap-5 mt-5">
				<CounterSteps />
				<CounterCount />
			</div>
		</FadeInOut>
	);
};

export default Counter;
