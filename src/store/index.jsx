import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import thunkMiddleware from 'redux-thunk';
import RootReducer, { initialState } from '../reducers';

export const createAppStore = () => {

	return createStore(
		RootReducer,
		initialState,
		applyMiddleware(thunkMiddleware, createLogger())
	);
};
