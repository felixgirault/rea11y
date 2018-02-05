import {withStateHandlers} from 'recompose';
import {noop} from 'lodash';
import NumberInput from './NumberInput';



/**
 *
 */
export default withStateHandlers(
	({defaultValue = 0}) => ({
		value: defaultValue
	}),
	{
		onChange: (_, {onChange = noop}) =>
			(value) => {
				onChange(value);
				return {value};
			}
	}
)(NumberInput);
