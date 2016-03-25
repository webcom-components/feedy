import React, { Component } from 'react';
import ReactDom from 'react-dom'; 
import { Router, createMemoryHistory, Route } from 'react-router';
import AccountCreated from './AccountCreated';
import CreateAccount from './CreateAccount';
import MessageSent from './MessageSent';
import SendMessage from './SendMessage';
import s from './styles';

export default class Feedy extends Component {
	static propTypes = {
		appName: React.PropTypes.string,
		namespaceUrl: React.PropTypes.string,
		screenshot: React.PropTypes.bool
	}

	constructor(props) {
		super();
		this.ref = new Webcom(`${props.namespaceUrl}/${props.appName}`);
		this.config = {
			screenshot: props.screenshot
		};
	}

	static childContextTypes = {
		ref: React.PropTypes.object.isRequired,
		config: React.PropTypes.object.isRequired
	}

	getChildContext() {
		return {
			ref: this.ref,
			config: this.config
		}
	}

	hideContainer() {
		let height = $(ReactDom.findDOMNode(this)).outerHeight(true) - $(this.refs.header).outerHeight(true);
		$(ReactDom.findDOMNode(this)).css('bottom', `-${height}px`);  
	}

	toggleVisibility() {
		ReactDom.findDOMNode(this).style.visibility = ReactDom.findDOMNode(this).style.visibility === 'hidden' ? '' : 'hidden';
	}

	SendMessageWrapper() {
		return <SendMessage toggleVisibility={this.toggleVisibility.bind(this)} />;
	}

	headerOnClick = () => {
		const bottom = $(ReactDom.findDOMNode(this)).css('bottom');
		if (bottom !== '0px') {
			$(ReactDom.findDOMNode(this)).css('bottom', 0);
		}
		else {
			this.hideContainer();
		}
	}

	componentDidMount() {
		const ref = new Webcom(this.props.namespaceUrl);

    	this.hideContainer();
	}

    render() {
        return (
            <div className={`reset ${s.container}`} >
				<div 
					className={s.header} 
					ref="header" 
					onClick={this.headerOnClick}>
					Donnez votre avis !
				</div>

				<div className={s.content}>
					<Router history={createMemoryHistory()}>
						<Route path="messageSent" component={MessageSent} />
						<Route path="createAccount" component={CreateAccount} />
						<Route path="accountCreated" component={AccountCreated} />
						<Route path="*" component={this.SendMessageWrapper.bind(this)} />
					</Router>
				</div>
			</div>
        );
    }
}
