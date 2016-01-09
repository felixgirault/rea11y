/**
 *
 */
import React, {Component, Children, PropTypes, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import uid from 'uid';
import {bound} from 'rea11y-utils';
import Tab from './Tab';



/**
 *
 */
@pureRender
export default class Tabs extends Component {

	/**
	 *
	 */
	static propTypes = {
		id: PropTypes.string,
		orientation: PropTypes.string,
		active: PropTypes.string
	}

	/**
	 *
	 */
	static defaultProps = {
		id: 'rea11y-' + uid(),
		orientation: 'horizontal'
	}

	/**
	 *
	 */
	componentDidUpdate(previousProps) {
		if (previousProps.active !== this.props.active) {
			const ref = this.tabRef(this.props.active);
			const active = this.refs[ref];

			findDOMNode(active).focus();
		}
	}

	/**
	 *
	 */
	tabRef(name) {
		return 'tab-' + name;
	}

	/**
	 *
	 */
	tabNames() {
		let names = [];

		Children.forEach(this.props.children, (child) => {
			names.push(child.props.name);
		});

		return names;
	}

	/**
	 *
	 */
	activateSibling(name, direction) {
		const names = this.tabNames();
		const index = names.indexOf(name) + direction;
		const max = names.length - 1;
		const sibling = bound(index, 0, max, true);

		this.emitActive(names[sibling]);
	}

	/**
	 *
	 */
	emitActive(name) {
		if (this.props.active !== name) {
			this.props.onActive(name);
		}
	}

	/**
	 *
	 */
	handleActive(name) {
		this.emitActive(name);
	}

	/**
	 *
	 */
	handlePrevious(name) {
		this.activateSibling(name, -1);
	}

	/**
	 *
	 */
	handleNext(name) {
		this.activateSibling(name, 1);
	}

	/**
	 *
	 */
	render() {
		const className = classNames(
			'rea11y-tabs',
			'rea11y-tabs-' + this.props.orientation
		);

		return (
			<div className={className}>
				<div className="rea11y-tab-list" role="tablist">
					{this.renderTabs()}
				</div>

				<div className="rea11y-panel-list">
					{this.renderPanels()}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	renderTabs() {
		return Children.map(this.props.children, (child) => {
			const name = child.props.name;
			const ref = this.tabRef(name);
			const active = (this.props.active === name);

			return (
				<Tab
					key={ref}
					ref={ref}
					id={this.props.id}
					name={name}
					title={child.props.title}
					active={active}
					onActive={::this.handleActive}
					onPrevious={::this.handlePrevious}
					onNext={::this.handleNext}
				/>
			);
		});
	}

	/**
	 *
	 */
	renderPanels() {
		return Children.map(this.props.children, (child) => {
			const name = child.props.name;
			const key = 'panel-' + child.props.name;
			const active = (this.props.active === name);

			return cloneElement(child, {
				key: key,
				id: this.props.id,
				active: active
			});
		});
	}
}
