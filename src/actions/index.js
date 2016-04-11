import { createAction, handleAction, handleActions } from 'redux-actions';

export const init = createAction('INIT');
export const login = createAction('LOGIN');
export const toggleVisibility = createAction('TOGGLE_VISIBILITY');
export const sendMessage = createAction('SEND_MESSAGE');
export const sendMessageError = createAction('SEND_MESSAGE_ERROR');
export const loginAndSendMessage = createAction('LOGIN_AND_SEND_MESSAGE');
export const createUser = createAction('CREATE_USER');
export const userCreated = createAction('USER_CREATED');
export const createUserError = createAction('CREATE_USER_ERROR');
export const resetErrorMsg = createAction('RESET_ERROR_MSG');
/*
export const ACCOUNT_CREATED = 'ACCOUNT_CREATED';
export const ACCOUNT_LOGGED = 'ACCOUNT_LOGGED';
export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';
export const FEEDBACK_SENT = 'FEEDBACK_SENT';


export function createAccount(login, password) {
	return dispatch => {
		data.createAccount(login.password).then(d => dispatch({
			type: ACCOUNT_CREATED
		}));
	};
}

export function login(login, password) {
	return (dispatch, getState) => {
		data.login(login, password).then(d => dispatch({
			type: ACCOUNT_LOGGED,
			data: d
		}));
	}
}

export function logout() {
	data.logout();
	return {
		type: ACCOUNT_LOGOUT
	};
}

export function sendFeedback({message, login, password}) {
	return (dispatch, getState) => {
		new Promise(resolve => {
			if (login && password) {
				data.login(login, password).then(d => {
					dispatch({
						type: ACCOUNT_LOGGED,
						data: d
					});
					resolve(true);
				)).catch(e => {
					resolve(false);
				});
			} else {
				resolve(true);
			}
		}).then((logged) => {
			if (logged) {
				dispatch({
					type: FEEDBACK_SENT,
					message: message
				});
			}
		});
	};
}
*/

//export 