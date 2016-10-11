import {compose, withState, withHandlers} from 'recompose';
import {noop} from 'lodash';
import Slider from './Slider';



/**
 *
 */
const enhance = compose(
	withState(
		'values',
		'setValues',
		({defaultValues = 0}) =>
			defaultValues
	),
	withHandlers({
		onChange: ({setValues, onChange = noop}) =>
			(values) => {
				setValues(values);
				onChange(values);
			}
	})
);



export default enhance(Slider);
