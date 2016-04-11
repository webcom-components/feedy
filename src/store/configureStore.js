/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from 'reducers';
import sagas from 'sagas';

const loggerMiddleware = createLogger({
	level: 'info',
	collapsed: true
});

/**
 * Creates a preconfigured store.
 */
export default function configureStore(reduxRouterMiddleware, initialState) {
	let createStoreWithMiddleware;

	if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {

		createStoreWithMiddleware = compose(
			applyMiddleware(
				loggerMiddleware,
				createSagaMiddleware(sagas),
				reduxRouterMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)(createStore);
	} else {
		createStoreWithMiddleware = compose(
			applyMiddleware(
				thunkMiddleware,
				createSagaMiddleware(sagas),
				reduxRouterMiddleware),
		)(createStore);
	}

	const store = createStoreWithMiddleware(reducers, initialState);
	reduxRouterMiddleware.listenForReplays(store);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
