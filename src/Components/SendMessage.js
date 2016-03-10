import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import s from './styles';
import uaParser from 'ua-parser-js';

const removeUndefined = obj => { 
	Object.keys(obj).forEach(k => { 
		if (typeof obj[k] === 'undefined') delete obj[k]; 
		else if (typeof obj[k] === 'object') obj[k] = removeUndefined(obj[k]); 
	});
	return obj;
}

export default class SendMessage extends Component {
	static contextTypes = {
		router: React.PropTypes.object,
		ref: React.PropTypes.object
	}

	constructor() {
		super();
		this.state = {};
	}

	sendMessage(e) {
		e.preventDefault();

		const 
			form = $('#formSendMessage')[0],
			ident = $('#inputEmail').val(),
			password = $('#inputPassword').val(),
			textareaContent = $('#textareaContent').val(),
			takeScreenshot = $('#checkboxScreenshot').is(':checked');

		new Promise((resolve, reject) => {
			this.context.ref.authWithPassword({
				email : ident,
				password : password
			}, (error, auth) => {
				if(error){
					reject('Utilisateur inconnu ou mot de passe incorrect');
				} else if (auth) {
					resolve(auth);
				}
			});
		}).then((auth) => {
			return {
				url: window.location.toString(),
				message: textareaContent,
				userAgent: removeUndefined((new uaParser()).getResult()),
				date: Date.now(),
				user: {
					email: auth.email,
					uid: auth.uid,
					id: auth.id					
				},

			};
		}).then((msg) => {
			if (!takeScreenshot) {
				return msg;
			}
			return new Promise((resolve) => {
				this.props.toggleVisibility();

				html2canvas(document.body, {
					onrendered: canvas => {
						this.props.toggleVisibility();
						msg.screenshot = canvas.toDataURL();
						resolve(msg);
					}
				});
			});
		}).then(((msg) => {
			this.context.ref.child('messages').push(msg);
			this.context.router.push('/messageSent');
		}).bind(this)).catch(((e) => {
			this.setState({
				errorMsg: e
			});
		}).bind(this));
	}

	render() {
		return (
			<div>
				<p>
					Laissez-nous un message. Nous vous contacterons dès que possible.
				</p>
				<p>
					Pas de compte ?
					{' '}
					<Link to="/createAccount">Créez en un !</Link>
				</p>
				<form id="formSendMessage" onSubmit={this.sendMessage.bind(this)}>
					<div className={s.error} id="sendMessageError">{this.state.errorMsg}</div>
					<div className={s.group}>
						<label htmlFor="inputEmail">Email *</label>
						<input id="inputEmail" type="email" required></input>
						<label htmlFor="inputPassword">Mot de passe *</label>
						<input id="inputPassword" type="password" required></input>
					</div>
					<div className={s.group}>
						<label htmlFor="textareaContent">Message</label>
						<textarea id="textareaContent" rows="6" required></textarea>
					</div>
					<div className={s.group}>
						<input type="checkbox" id="checkboxScreenshot"></input>
						{' '}
						<label htmlFor="checkboxScreenshot">Capture d'écran ?</label>
					</div>
					<input type="submit" value="Envoyer"></input>
				</form>
			</div>
		);
	}
}