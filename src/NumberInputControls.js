import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import noop from './utils/noop';
import NumberInputControl from './NumberInputControl';



/**
 *
 */
const NumberInputControls = ({
	incrementText = '▲',
	decrementText = '▼',
	incrementTitle = 'Increment',
	decrementTitle = 'Decrement',
	onIncrement = noop,
	onDecrement = noop
}) => (
	<div className="rea11y-NumberInputControls">
		<NumberInputControl
			name="increment"
			text={incrementText}
			title={incrementTitle}
			onClick={onIncrement}
		/>

		<NumberInputControl
			name="decrement"
			text={decrementText}
			title={decrementTitle}
			onClick={onDecrement}
		/>
	</div>
);

NumberInputControls.propTypes = {
	incrementText: PropTypes.string,
	decrementText: PropTypes.string,
	incrementTitle: PropTypes.string,
	decrementTitle: PropTypes.string,
	onIncrement: PropTypes.func,
	onDecrement: PropTypes.func
};



export default pure(NumberInputControls);
