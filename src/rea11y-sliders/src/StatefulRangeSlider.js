/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import noop from 'no-op';
import RangeSlider from './RangeSlider';



/**
 *
 */
@pureRender
export default class StatefulSlider extends Component {

	/**
	 *
	 */
	static propTypes = {
		defaultLowerValue: PropTypes.number,
		defaultUpperValue: PropTypes.number,
		onChange: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		defaultLowerValue: 0,
		defaultUpperValue: 0,
		onChange: noop
	}

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			lowerValue: this.props.defaultLowerValue,
			upperValue: this.props.defaultUpperValue
		};
	}

	/**
	 *
	 */
	handleChange(lower, upper) {
		this.setState({
			lowerValue: lower,
			upperValue: upper
		}, () => {
			this.props.onChange(lower, upper);
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<RangeSlider
				{...this.props}
				lowerValue={this.state.lowerValue}
				upperValue={this.state.upperValue}
				onChange={::this.handleChange}
			/>
		);
	}
}
