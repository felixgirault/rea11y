import {compose, withStateHandlers, mapProps} from 'recompose';
import noop from './utils/noop';
import ToggleButton from './ToggleButton';



/**
 *
 */
export default compose(
	withStateHandlers(
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
	),
	// eslint-disable-next-line no-unused-vars
	mapProps(({defaultPressed, ...props}) =>
		props
	)
)(ToggleButton);
