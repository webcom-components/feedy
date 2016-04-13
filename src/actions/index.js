import { createAction, handleAction, handleActions } from 'redux-actions';

export const init = createAction('INIT');
export const login = createAction('LOGIN');
export const toggleVisibility = createAction('TOGGLE_VISIBILITY');
export const sendMessage = createAction('SEND_MESSAGE');
export const sendMessageError = createAction('SEND_MESSAGE_ERROR');
export const loginAndSendMessage = createAction('LOGIN_AND_SEND_MESSAGE');
export const logout = createAction('LOGOUT');
export const logged = createAction('LOGGED');
export const unlogged = createAction('UNLOGGED');
export const createUser = createAction('CREATE_USER');
export const createUserError = createAction('CREATE_USER_ERROR');
export const resetErrorMsg = createAction('RESET_ERROR_MSG');