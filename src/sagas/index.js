import { take, call, cps, put, fork, select } from 'redux-saga/effects';

import { 
	init, 
	login as webcomLogin, 
	createAccount, 
	logout, 
	push, 
	getUserData,
	screenshot
} from 'services';
import { Components, Component } from 'actions';
import * as actions from 'actions';

let appRouter;

export function* login(email, password) {
	try {
		const auth = yield call(webcomLogin, email, password);
		yield put(actions.logged, auth);
		return auth;
	}
	catch (e) {
		yield put(actions.sendMessageError({ msg: e.message }));
		return false;
	}
}

export function* sendMessage(message, auth, takeScreenshot) {
	let data = yield call(getUserData);
	data = {
		...data,
		user: {
			email: auth.email,
			uid: auth.uid
		},
		message,
		date: Date.now()
	};

	if (takeScreenshot) {
		data = {
			...data,
			screenshot: yield call(screenshot)
		};
	}

	yield call(push, 'message', data);
	yield call(appRouter.push, '/messageSent');
}

export function* watchInit() {
	const { payload: { namespaceUrl, appName, router} } = yield take('INIT');
	appRouter = router;
	yield call(init, namespaceUrl, appName);
}	

export function* watchSendMessage() {
	while (true) {
		const { payload: { 
			content,
			takeScreenshot } 
		} = yield take('SEND_MESSAGE');

		// get auth
		if ( auth ) {
			yield call(sendMessage, content, auth, takeScreenshot);
		}
	}
}

export function* watchLoginAndSendMessage() {
	while (true) {
		const { payload: { 
			email, 
			password, 
			message,
			takeScreenshot } 
		} = yield take('LOGIN_AND_SEND_MESSAGE');

		const auth = yield call(login, email, password);

		if ( auth ) {
			yield call(sendMessage, message, auth, takeScreenshot);
		}
	}
}

export function* watchCreateUser() {
	while (true) {
		const { payload : { email, pass1, pass2 } } = yield take('CREATE_USER');
		if (pass1 !== pass2) {
			yield put(actions.createUserError({msg: 'Le mot de passe est différent'}));
			continue;
		}
		else {
			try {
				yield call(createAccount, email, pass1);
				yield call(appRouter.push, '/accountCreated');
			}
			catch (e) {
				yield put(actions.createUserError({ msg: e.message}));
			}			
		}
	}
}

export default function* root() {
	yield [
		fork(watchInit),
		fork(watchSendMessage),
		fork(watchLoginAndSendMessage),
		fork(watchCreateUser)
	];
}