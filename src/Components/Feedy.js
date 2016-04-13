import React, { Component } from 'react';
import ReactDom from 'react-dom'; 

import { connect } from 'react-redux';

import * as actions from 'actions';
import { outerHeight } from 'utils/dom';

import s from './styles';

class Feedy extends Component {
	static propTypes = {
		appName: React.PropTypes.string.isRequired,
		namespaceUrl: React.PropTypes.string.isRequired,
		screenshot: React.PropTypes.bool.isRequired
	}

	constructor(props) {
		super();

		this.config = {
			screenshot: props.screenshot
		};
	}

	static childContextTypes = {
		config: React.PropTypes.object.isRequired
	}

	getChildContext() {
		return {
			config: this.config
		};
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	headerOnClick = () => {
		this.props.dispatch(actions.toggleVisibility());
	}
	
	/**
	 * Display or hide Feedy
	 */
	refreshVisibility() {
		if (this.props.visible) {
			ReactDom.findDOMNode(this).style.bottom = 0;
		}
		else {
			ReactDom.findDOMNode(this).style.bottom = `${-this.getInnerHeight()}px`;
		}
	}

	getInnerHeight() {
		return outerHeight(ReactDom.findDOMNode(this)) - outerHeight(this.refs.header);
	}

	componentDidMount() {
		this.props.dispatch(actions.init({
			namespaceUrl: this.props.namespaceUrl,
			appName: this.props.appName,
			router: this.context.router
		}));

		this.refreshVisibility();
	}

	componentDidUpdate() {
		this.refreshVisibility();
	}

    render() {
		return (
			<div className={`reset ${s.container}`}>
				<div>
					<div 
						className={s.header} 
						ref="header" 
						onClick={this.headerOnClick}>
						Donnez votre avis !
					</div>

					<div className={s.content}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(state => ({
	visible: state.main.visible
}))(Feedy);
