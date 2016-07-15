import {compose, withState, withHandlers} from 'recompose';
import {noop} from 'lodash';
import Slider from './Slider';



/**
 *
 */
const enhance = compose(
	withState(
		'value',
		'setValue',
		({defaultValue = 0}) =>
			defaultValue
	),
	withHandlers({
		onChange: ({setValue, onChange = noop}) =>
			(value) => {
				setValue(value);
				onChange(value);
			}
	})
);



export default enhance(Slider);
