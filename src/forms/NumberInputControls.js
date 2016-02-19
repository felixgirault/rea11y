/**
 *
 */
import React, {PropTypes} from 'react';
import {noop} from 'lodash';
import NumberInputControl from './NumberInputControl';



/**
 *
 */
export default function NumberInputControls({
	incrementText = '▲',
	decrementText = '▼',
	incrementTitle = 'Increment',
	decrementTitle = 'Decrement',
	onIncrement = noop,
	onDecrement = noop
}) {
	return (
		<div className="rea11y-number-input-controls">
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
}

/**
 *
 */
NumberInputControls.propTypes = {
	incrementText: PropTypes.string,
	decrementText: PropTypes.string,
	incrementTitle: PropTypes.string,
	decrementTitle: PropTypes.string,
	onIncrement: PropTypes.func,
	onDecrement: PropTypes.func
};
