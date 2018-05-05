import * as React from 'react'

import ImageGridLayout from '../containers/image-grid-layout';
import Modal from '../containers/modal';

const styles = require('../styles/app.scss');

const App = () => {
	const mgType = 'div';
	return (
		<div className={styles.app}>
			<ImageGridLayout />
			<Modal />
		</div>
	);
};

export default App;