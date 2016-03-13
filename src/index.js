import React from 'react';
import ReactDom from 'react-dom';
import Feedy from './Components/Feedy';

import styles from './assets/styles/reset.less';

module.exports = function({namespaceUrl='https://webcom.orange.com/base/feedy', appName='general'}) {
	$("<div id='feedy'></div>").appendTo(document.body);

	ReactDom.render(
		<Feedy namespaceUrl={namespaceUrl} appName={appName} />,
		document.getElementById('feedy')
	);	
}