import React from 'react';
import {render} from 'react-dom';
import Demos from './src/Demos';

import '../css/modal.css';
import '../css/progress-bar.css';
import '../css/sliders.css';
import '../css/tabs.css';
import '../css/forms.css';
import './css/demo.css';



/**
 *
 */
render(
	<Demos />,
	document.getElementById('demos')
);
