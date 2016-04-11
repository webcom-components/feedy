import uaParser from 'ua-parser-js';

let ref;

export function init(url, appName) {
	ref = new Webcom(`${url}/${appName}`);
}

export function login(email, password) {
	return new Promise((resolve, reject) => {
		ref.authWithPassword({
			email,
			password
		}, (error, auth) => {
			if(error){
				reject(new Error('Utilisateur inconnu ou mot de passe incorrect'));
			} else if (auth) {
				resolve(auth);
			}
		});
	});
}

export function createAccount(login, password) {
	return new Promise((resolve, reject) => {
		ref.createUser(login, password, (error, data) => {
			if(error){
				switch (error.code){
				case 'EMAIL_TAKEN':
					reject(new Error('L\'email est déjà pris'));
					break;
				case 'INVALID_EMAIL':
					reject(new Error('L\'email est invalide'));
					break;
				default:
					reject(new Error('Impossible de créer votre compte'));
				}
			}
			else{
				resolve(data);
			}
		});
	});
}

export function logout() {
	ref.logout();
}

export function push(path, obj) {
	return new Promise((resolve, reject) => {
		ref.child(path).push(obj, (error, data) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(data);
			}
		});
	});
}

const removeUndefined = obj => { 
	Object.keys(obj).forEach(k => { 
		if (typeof obj[k] === 'undefined') delete obj[k]; 
		else if (typeof obj[k] === 'object') obj[k] = removeUndefined(obj[k]); 
	});
	return obj;
}

export function getUserData() {
	return {
		url: window.location.toString(),
		userAgent: removeUndefined((new uaParser()).getResult())
	};
}

const toggleFeedyVisibility = () => {
	const feedy = document.getElementById('feedy');
	feedy.style.visibility = feedy.style.visibility === 'hidden' ? '' : 'hidden';
}

export function screenshot() {
	return new Promise((resolve) => {
		toggleFeedyVisibility();

		html2canvas(document.body, {
			onrendered: canvas => {
				toggleFeedyVisibility();
				resolve(canvas.toDataURL());
			}
		});
	});
}