/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import {ARROW, HOME, END} from 'offkey';
import {noop} from 'lodash';
import KeyHandler from '../utils/KeyHandler';



/**
 *
 */
@pureRender
export default class Tab extends Component {

	/**
	 *
	 */
	static propTypes = {
		id: PropTypes.string,
		panelId: PropTypes.string,
		name: PropTypes.string,
		title: PropTypes.string,
		active: PropTypes.bool,
		onActive: PropTypes.func,
		onFirst: PropTypes.func,
		onLast: PropTypes.func,
		onPrevious: PropTypes.func,
		onNext: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		active: false,
		onActive: noop,
		onFirst: noop,
		onLast: noop,
		onPrevious: noop,
		onNext: noop
	};

	/**
	 *
	 */
	@autoBind
	handleClick() {
		this.props.onActive(this.props.name);
	}

	/**
	 *
	 */
	@autoBind
	handleFirst() {
		this.props.onFirst();
	}

	/**
	 *
	 */
	@autoBind
	handleLast() {
		this.props.onLast();
	}

	/**
	 *
	 */
	@autoBind
	handlePrevious() {
		this.props.onPrevious(this.props.name);
	}

	/**
	 *
	 */
	@autoBind
	handleNext() {
		this.props.onNext(this.props.name);
	}

	/**
	 *
	 */
	render() {
		const {id, panelId, name, active} = this.props;

		const className = classNames({
			'rea11y-tab': true,
			'rea11y-tab-active': active,
			[`rea11y-tab-${name}`]: true
		});

		return (
			<KeyHandler
				handlers={{
					[HOME]: this.handleFirst,
					[END]: this.handleLast,
					[ARROW.UP]: this.handlePrevious,
					[ARROW.LEFT]: this.handlePrevious,
					[ARROW.DOWN]: this.handleNext,
					[ARROW.RIGHT]: this.handleNext
				}}
			>
				<button
					id={id}
					className={className}
					role="tab"
					aria-controls={panelId}
					aria-selected={active}
					onClick={this.handleClick}
					onKeyDown={this.handleKeyDown}
					tabIndex={active ? 0 : -1}
				>
					{this.props.title}
				</button>
			</KeyHandler>
		);
	}
}
