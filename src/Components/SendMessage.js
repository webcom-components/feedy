import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import s from './styles';

import * as actions from 'actions';

class SendMessage extends Component {
	static contextTypes = {
		router: React.PropTypes.object,
		ref: React.PropTypes.object,
		config: React.PropTypes.object
	}

	constructor() {
		super();
		this.state = {};
	}

	sendMessage(e) {
		e.preventDefault();

		if (!this.props.logged) {
			const {
				email: { value: email }, 
				password: { value: password },
				message: { value: message }
			} = this.refs;

			const takeScreenshot = this.refs.screenshot ? this.refs.screenshot.checked : false;

			this.props.dispatch(actions.loginAndSendMessage({
				email,
				password,
				message,
				takeScreenshot
			}));
		}
		else {
			const {
				message: { value: message }, 
				screenshot: { checked: takeScreenshot }
			} = this.refs;

			this.props.dispatch(actions.sendMessage({
				message,
				takeScreenshot
			}));
		}
	}

	resetErrorMsg() {
		if (this.props.errorMsg) {
			this.props.dispatch(actions.resetErrorMsg());			
		}
	}

	logout() {
		this.props.dispatch(actions.logout());
	}

	render() {
		return (
			<div>
				<p>
					Laissez-nous un message. Nous vous contacterons dès que possible.
				</p>
				{!this.props.logged && <p>
					Pas de compte ?
					{' '}
					<Link to="/createAccount">Créez en un !</Link>
				</p>}
				<form ref="form" onSubmit={this.sendMessage.bind(this)}>
					<div className={s.error} id="sendMessageError">{this.props.errorMsg}</div>
					{!this.props.logged && <div className={s.group}>
						<label htmlFor="inputEmail">Email *</label>
						<input 
							id="inputEmail" 
							ref="email" 
							type="email" 
							required
							onChange={this.resetErrorMsg.bind(this)}></input>
						<label htmlFor="inputPassword">Mot de passe *</label>
						<input 
							id="inputPassword" 
							ref="password" 
							type="password" 
							required
							onChange={this.resetErrorMsg.bind(this)}></input>
					</div>}
					{this.props.logged && <div className={s.group}>
						Bonjour {this.props.email} !
						<div><a onClick={this.logout.bind(this)}>Se déconnecter</a></div>
					</div>}
					<div className={s.group}>
						<label htmlFor="textareaContent">Message</label>
						<textarea id="textareaContent" ref="message" rows="6" required></textarea>
					</div>
					{this.context.config.screenshot && <div className={s.group}>
						<input type="checkbox" ref="screenshot" id="checkboxScreenshot"></input>
						{' '}
						<label htmlFor="checkboxScreenshot">Capture d'écran ?</label>
					</div>}
					<input type="submit" value="Envoyer"></input>
				</form>
			</div>
		);
	}
}

export default connect(state => ({
	logged: state.main.logged,
	email: state.main.auth && state.main.auth.email,
	errorMsg: state.main.sendMessageError
}))(SendMessage);