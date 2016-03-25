import React from 'react';
import ReactDom from 'react-dom';
import Feedy from './Components/Feedy';

import styles from './assets/styles/reset.less';

module.exports = function({namespaceUrl='https://webcom.orange.com/base/feedy', appName='general', screenshot=true}={}) {
	$("<div id='feedy'></div>").appendTo(document.body);

	ReactDom.render(
		<Feedy namespaceUrl={namespaceUrl} appName={appName} screenshot={screenshot} />,
		document.getElementById('feedy')
	);	
}