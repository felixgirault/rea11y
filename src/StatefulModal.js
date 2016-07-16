import connect from 'react-state-container';
import Slider from './Slider';



/**
 *
 */
const mapStateToProps = (state) => state;

/**
 *
 */
const mapSetStateToProps = (setState, {onChange}) => ({
	onChange(value) {
		setState({value}, () => onChange(value));
	}
});

/**
 *
 */
const getInitialState = ({defaultValue}) => ({
	value: defaultValue
});



export default connect(
	mapStateToProps,
	mapSetStateToProps,
	getInitialState
)(Slider);
