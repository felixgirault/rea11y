/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import SliderHandle from './SliderHandle';



/**
 *
 */
@pureRender
export default class Slider extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal'
	};

	/**
	 *
	 */
	@autoBind
	handleClick(event) {
		this.refs.handle.handleDrag(event);
	}

	/**
	 *
	 */
	render() {
		const className = classNames([
			'r1y-Slider',
			`r1y-Slider--${this.props.orientation}`
		]);

		return (
			<div className={className}>
				<div
					ref="track"
					className="r1y-Slider-track"
					onClick={this.handleClick}
				>
					<SliderHandle {...this.props} ref="handle" />
				</div>
			</div>
		);
	}
}
