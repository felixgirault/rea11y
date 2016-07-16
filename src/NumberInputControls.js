import React, {PropTypes} from 'react';
import {pure} from 'recompose';
import {noop} from 'lodash';
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
	<div className="r1y-NumberInputControls">
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
