import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({ window });

if (process.env.NODE_ENV !== 'production') {
	history.listen((listener) => {
		console.info(listener.action, listener.location);
	});
}
