let ref;

export function init(url, appName) {
	ref = new Webcom(`${url}/${appName}`);
}

export function login(login, password) {
	return new Promise((resolve, reject) => {
		ref.authWithPassword({
			email : login,
			password : password
		}, (error, auth) => {
			if(error){
				reject('Utilisateur inconnu ou mot de passe incorrect');
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
					case "EMAIL_TAKEN":
						reject("L'email est déjà pris");
						break;
					case "INVALID_EMAIL":
						reject("L'email est invalide");
						break;
					default:
						reject("Impossible de créer votre compte");
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

export function sendFeedback(obj) {
	return new Promise((resolve, reject) => {
		ref.child('messages').push(obj, (error, data) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(data);
			}
		});
	});
}