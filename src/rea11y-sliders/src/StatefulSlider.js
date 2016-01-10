/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import noop from 'lodash/utility/noop';
import Slider from './Slider';



/**
 *
 */
@pureRender
export default class StatefulSlider extends Component {

	/**
	 *
	 */
	static propTypes = {
		defaultValue: PropTypes.number,
		onChange: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		defaultValue: 0,
		onChange: noop
	}

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.defaultValue
		};
	}

	/**
	 *
	 */
	@autoBind
	handleChange(value) {
		this.setState({
			value: value
		}, () => {
			this.props.onChange(value);
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<Slider
				{...this.props}
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	}
}
