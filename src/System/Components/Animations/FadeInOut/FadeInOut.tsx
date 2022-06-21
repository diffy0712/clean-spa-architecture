import { FC } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type FadeInOutProps = {
	delay?: number;
} & HTMLMotionProps<'div'>;

const FadeInOut: FC<FadeInOutProps> = ({ transition, delay, ...props }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ delay: ((delay as number) + 1) * 0.1, ...transition }}
		{...props}
	/>
);

FadeInOut.defaultProps = {
	delay: 0,
};

export default FadeInOut;
