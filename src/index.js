import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, createMemoryHistory, Route, IndexRoute } from 'react-router';
import { syncHistory } from 'redux-simple-router';

import Feedy from 'Components/Feedy';
import AccountCreated from 'Components/AccountCreated';
import CreateAccount from 'Components/CreateAccount';
import MessageSent from 'Components/MessageSent';
import SendMessage from 'Components/SendMessage';
import configureStore from 'store/configureStore';

import styles from './assets/styles/reset.less';

const history = createMemoryHistory();
const reduxRouterMiddleware = syncHistory(history);
const store = configureStore(reduxRouterMiddleware);


module.exports = function({namespaceUrl='https://webcom.orange.com/base/feedy', appName='general', screenshot=true}={}) {
	const el = document.createElement('div');
	el.id = 'feedy';
	document.body.appendChild(el);

	const WrapperFeedy = (props) => <Feedy 
		{...props}
		namespaceUrl={namespaceUrl} 
		appName={appName} 
		screenshot={screenshot} />;

	ReactDom.render(
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={WrapperFeedy} >
					<IndexRoute component={SendMessage} />
					<Route path="messageSent" component={MessageSent} />
					<Route path="createAccount" component={CreateAccount} />
					<Route path="accountCreated" component={AccountCreated} />
					<Route path="sendMessage" component={SendMessage} />
				</Route>
			</Router>
		</Provider>,
		document.getElementById('feedy')
	);	
};