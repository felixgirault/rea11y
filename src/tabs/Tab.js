/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import keys from 'offkey';
import noop from 'lodash/utility/noop';
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
		name: PropTypes.string,
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
		const {id, name, active} = this.props;

		const tabId = `${id}-${name}`;
		const panelId = `${id}-panel-${name}`;

		const className = classNames({
			'rea11y-tab': true,
			'rea11y-tab-active': active,
			['rea11y-tab-' + name]: true
		});

		return (
			<KeyHandler handlers={{
				[keys.HOME]: this.handleFirst,
				[keys.END]: this.handleLast,
				[keys.ARROW.UP]: this.handlePrevious,
				[keys.ARROW.LEFT]: this.handlePrevious,
				[keys.ARROW.DOWN]: this.handleNext,
				[keys.ARROW.RIGHT]: this.handleNext
			}}>
				<button
					id={tabId}
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
