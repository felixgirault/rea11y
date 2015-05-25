/**
 *
 */
'use strict';

import {Component, Children, PropTypes, findDOMNode, cloneElement} from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import uid from 'uid';
import bound from '../utils/bound';
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
		active: PropTypes.string
	}

	/**
	 *
	 */
	static defaultProps = {
		id: 'rea11y-' + uid()
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
	@autobind
	handleActive(name) {
		this.emitActive(name);
	}

	/**
	 *
	 */
	@autobind
	handlePrevious(name) {
		this.activateSibling(name, -1);
	}

	/**
	 *
	 */
	@autobind
	handleNext(name) {
		this.activateSibling(name, 1);
	}

	/**
	 *
	 */
	render() {
		return (
			<div className="rea11y-tabs">
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
					onActive={this.handleActive}
					onPrevious={this.handlePrevious}
					onNext={this.handleNext}
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
