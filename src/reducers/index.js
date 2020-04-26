import { combineReducers } from 'redux';

import {
	authentication,
	initialState as authenticationState,
} from './authentication';
import { users, initialState as usersState } from './users';
import { alert, initialState as alertState } from './alert';

const rootReducer = combineReducers({
	authentication,
	users,
	alert,
});

export const initialState = {
	authentication: authenticationState,
	users: usersState,
	alert: alertState,
};

export default rootReducer;
