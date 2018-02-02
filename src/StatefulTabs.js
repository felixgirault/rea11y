import {withStateHandlers} from 'recompose';
import {noop} from 'lodash';
import Tabs from './Tabs';



/**
 *
 */
export default withStateHandlers(
	({defaultActive = 0}) => ({
		active: defaultActive
	}),
	{
		onActive: (_, {onActive = noop}) =>
			(active) => {
				onActive(active);
				return {active};
			}
	}
)(Tabs);
