import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from 'actions';
import s from './styles';

class CreateAccount extends Component {
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

		const { 
			email: { value: email }, 
			pass1: { value: pass1 }, 
			pass2: { value: pass2 } 
		} = this.refs;

		this.props.dispatch(actions.createUser({ 
			email, 
			pass1, 
			pass2
		}));
	}

	resetErrorMsg() {
		if (this.props.errorMsg) {
			this.props.dispatch(actions.resetErrorMsg());			
		}
	}

	render() {
		return (
			<div>
				<form id="formCreateAccount" onSubmit={this.onSubmit.bind(this)}>
					<p>
						<Link to="/sendMessage">Vous avez déja un compte ?</Link>
					</p>
					<div className={s.error} id="createAccountError">{this.props.errorMsg}</div>
					<div className={s.group}>
						<label htmlFor="inputCAEmail">Email</label>
						<input 
							id="inputCAEmail" 
							ref="email" 
							type="email" 
							required
							onChange={this.resetErrorMsg.bind(this)}></input>
					</div>
					<div className={s.group}>
						<label htmlFor="inputCAPassword">Mot de passe</label>
						<input 
							id="inputCAPassword" 
							ref="pass1" 
							type="password" 
							required 
							onChange={this.resetErrorMsg.bind(this)}></input>
					</div>
					<div className={s.group}>
						<label htmlFor="inputCAPassword2">Ressaisissez votre mot de passe</label>
						<input 
							id="inputCAPassword2" 
							ref="pass2" 
							type="password" 
							required 
							onChange={this.resetErrorMsg.bind(this)}></input>
					</div>
					<input type="submit" value="Créer"></input>
				</form>
			</div>
		);
	}
}

export default connect(state => ({
	errorMsg: state.main.createUserError
}))(CreateAccount);