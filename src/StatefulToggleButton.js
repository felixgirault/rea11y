import {compose, withStateHandlers, mapProps} from 'recompose';
import {noop, omit} from 'lodash';
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
	mapProps((props) =>
		omit(props, 'defaultPressed')
	)
)(ToggleButton);
