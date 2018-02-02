import {withStateHandlers} from 'recompose';
import {noop} from 'lodash';
import ToggleButton from './ToggleButton';



/**
 *
 */
export default withStateHandlers(
	({defaultPressed = false}) => ({
		pressed: defaultPressed
	}),
	{
		onToggle: (_, {onToggle = noop}) =>
			(pressed) => {
				onToggle(pressed);
				return {pressed};
			}
	}
)(ToggleButton);
