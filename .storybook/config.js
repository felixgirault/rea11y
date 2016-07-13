import {configure, setAddon} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import '../css/forms.css';
import '../css/modal.css';
import '../css/progress-bar.css';
import '../css/sliders.css';
import '../css/tabs.css';



/**
 *
 */
setAddon(infoAddon);

/**
 *
 */
configure(() => {
	const req = require.context('../stories', true, /\.js$/);
	req.keys().forEach(req);
}, module);
