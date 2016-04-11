const initialState = {
	logged: false,
	visible: false
};

/**
 * Main reducer
 */
export default function(state=initialState, {type, payload}) {
	switch (type) {
	case 'TOGGLE_VISIBILITY':
		return {
			...state,
			visible: !state.visible
		};
	case 'LOGGED':
		return {
			...state,
			logged: true
		};
	case 'UNLOGGED':
		return {
			...state,
			logged: false
		};
	case 'SEND_MESSAGE_ERROR':
		return {
			...state,
			sendMessageError: payload.msg
		};
	case 'CREATE_USER_ERROR':
		return {
			...state,
			createUserError: payload.msg
		};
	case 'RESET_ERROR_MSG':
		return {
			...state,
			createUserError: null,
			sendMessageError: null
		};
	case 'USER_CREATED':
		return {
			...state,
			auth: { 
				...payload.auth
			}
		};
	default:
		return state;
	}
}