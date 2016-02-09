import React from 'react';
import {render} from 'react-dom';
import Demos from './demo/src/Demos';

import 'rea11y-modal/css/styles.css';
import 'rea11y-number-input/css/styles.css';
import 'rea11y-progress-bar/css/styles.css';
import 'rea11y-sliders/css/styles.css';
import 'rea11y-tabs/css/styles.css';
import 'rea11y-forms/css/styles.css';
import './demo/css/demo.css';



/**
 *
 */
render(
	<Demos />,
	document.getElementById('demos')
);
