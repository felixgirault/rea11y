import {compose, withState, withHandlers} from 'recompose';
import {noop} from 'lodash';
import Tabs from './Tabs';



/**
 *
 */
const enhance = compose(
	withState(
		'active',
		'setActive',
		({defaultActive = 0}) =>
			defaultActive
	),
	withHandlers({
		onActive: ({setActive, onActive = noop}) =>
			(active) => {
				setActive(active);
				onActive(active);
			}
	})
);



export default enhance(Tabs);
