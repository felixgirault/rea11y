import {withStateHandlers} from 'recompose';
import {noop} from 'lodash';
import Slider from './Slider';



/**
 *
 */
export default withStateHandlers(
	({defaultValues = []}) => ({
		values: defaultValues
	}),
	{
		onChange: (_, {onChange = noop}) =>
			(values) => {
				onChange(values);
				return {values};
			}
	}
)(Slider);
