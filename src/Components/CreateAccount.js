import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import s from './styles';

export default class CreateAccount extends Component {
	static contextTypes = {
		router: React.PropTypes.object,
		ref: React.PropTypes.object
	}

	constructor() {
		super();
		this.state = {};
	}

	onSubmit = (e) => {
		e.preventDefault();

		const 
			form = $('#formCreateAccount')[0],
			email = $('#inputCAEmail').val(),
			password = $('#inputCAPassword').val(),
			password2 = $('#inputCAPassword2').val();

		if (password !== password2) {
			//showError('createAccountError', );
			this.setState({
				errorMsg: 'Le mot de passe est différent'
			});
			return;
		}

		this.context.ref.createUser(email, password, ((error, data) => {
			if(error){
				switch (error.code){
					case "EMAIL_TAKEN":
						this.setState({
							errorMsg: "L'email est déjà pris"
						});
						break;
					case "INVALID_EMAIL":
						this.setState({
							errorMsg: "L'email est invalide"
						});
						break;
					default:
						this.setState({
							errorMsg: "Impossible de créer votre compte"
						});
				}
			}
			else{
				this.context.router.push('accountCreated');
			}
		}).bind(this));
	}

	resetErrorMsg() {
		this.setState({
			errorMsg: undefined
		});
	}

	render() {
		return (
			<div>
				<form id="formCreateAccount" onSubmit={this.onSubmit.bind(this)}>
					<p>
						<Link to="/sendMessage">Vous avez déja un compte ?</Link>
					</p>
					<div className={s.error} id="createAccountError">{this.state.errorMsg}</div>
					<div className={s.group}>
						<label htmlFor="inputCAEmail">Email</label>
						<input id="inputCAEmail" type="email" required></input>
					</div>
					<div className={s.group}>
						<label htmlFor="inputCAPassword">Mot de passe</label>
						<input id="inputCAPassword" type="password" required onChange={this.resetErrorMsg.bind(this)}></input>
					</div>
					<div className={s.group}>
						<label htmlFor="inputCAPassword2">Ressaisissez votre mot de passe</label>
						<input id="inputCAPassword2" type="password" required onChange={this.resetErrorMsg.bind(this)}></input>
					</div>
					<input type="submit" value="Créer"></input>
				</form>
			</div>
		);
	}
}