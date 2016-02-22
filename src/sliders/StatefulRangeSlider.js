/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import {noop} from 'lodash';
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
	};

	/**
	 *
	 */
	static defaultProps = {
		defaultLowerValue: 0,
		defaultUpperValue: 0,
		onChange: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			lower: props.defaultLowerValue,
			upper: props.defaultUpperValue
		};
	}

	/**
	 *
	 */
	@autoBind
	handleChange(lower, upper) {
		this.setState({lower, upper}, () => {
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
				lowerValue={this.state.lower}
				upperValue={this.state.upper}
				onChange={this.handleChange}
			/>
		);
	}
}
