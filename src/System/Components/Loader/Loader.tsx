import { memo } from 'react';
import animation from './animation.json';
import { Player } from '@lottiefiles/react-lottie-player';

const Loader = () => (
	<div>
		<Player
			autoplay
			loop
			src={animation}
			style={{ height: '300px', width: '300px' }}
		/>
	</div>
);

export default memo(Loader);
