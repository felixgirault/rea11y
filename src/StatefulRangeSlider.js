import {compose, withState, withHandlers} from 'recompose';
import {noop} from 'lodash';
import RangeSlider from './RangeSlider';



/**
 *
 */
const enhance = compose(
	withState(
		'lowerValue',
		'setLowerValue',
		({defaultLowerValue = 0}) =>
			defaultLowerValue
	),
	withState(
		'upperValue',
		'setUpperValue',
		({defaultUpperValue = 0}) =>
			defaultUpperValue
	),
	withHandlers({
		onChange: ({setLowerValue, setUpperValue, onChange = noop}) =>
			(lowerValue, upperValue) => {
				setLowerValue(lowerValue);
				setUpperValue(upperValue);
				onChange(lowerValue, upperValue);
			}
	})
);



export default enhance(RangeSlider);
