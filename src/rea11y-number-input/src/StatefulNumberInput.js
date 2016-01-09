/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import noop from 'no-op';
import NumberInput from './NumberInput';



/**
 *
 */
@pureRender
export default class StatefulNumberInput extends Component {

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
			value: props.defaultValue
		};
	}

	/**
	 *
	 */
	handleChange(value) {
		this.setState({ value }, () => {
			this.props.onChange(value);
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<NumberInput
				{...this.props}
				value={this.state.value}
				onChange={::this.handleChange}
			/>
		);
	}
}
