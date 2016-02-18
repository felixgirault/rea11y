/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import {noop} from 'lodash';
import ToggleButton from './ToggleButton';



/**
 *
 */
@pureRender
export default class StatefulToggleButton extends Component {

	/**
	 *
	 */
	static propTypes = {
		defaultPressed: PropTypes.bool,
		onToggle: PropTypes.func,
		onPress: PropTypes.func,
		onRelease: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		defaultPressed: false,
		onToggle: noop,
		onPress: noop,
		onRelease: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			pressed: this.props.defaultPressed
		};
	}

	/**
	 *
	 */
	@autoBind
	handleToggle(pressed) {
		this.setState({pressed}, () => {
			this.props.onToggle(this.state.pressed);
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<ToggleButton
				{...this.props}
				pressed={this.state.pressed}
				onToggle={this.handleToggle}
				onPress={this.props.onPress}
				onRelease={this.props.onRelease}
			/>
		);
	}
}
