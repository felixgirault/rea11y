/**
 *
 */
'use strict';

import {Component, Children, PropTypes, addons, findDOMNode} from 'react';
import uid from 'uid';
import bindMethods from '../utils/bindMethods';
import bound from '../utils/bound';
import Tab from './Tab';



/**
 *
 */
export default class Tabs extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'handleActivation',
			'handlePrevious',
			'handleNext'
		);

		this.state = {
			active: 0
		};
	}

	/**
	 *
	 */
	componentDidUpdate(previousProps, previousState) {
		if (previousState.active !== this.state.active) {
			const ref = this.ref(this.state.active);
			const active = this.refs[ref];

			findDOMNode(active).focus();
		}
	}

	/**
	 *
	 */
	ref(index) {
		return 'tab-' + index;
	}

	/**
	 *
	 */
	activateSibling(direction) {
		this.setState((state, props) => {
			const max = Children.count(props.children) - 1;
			const sibling = state.active + direction;

			return {
				active: bound(sibling, 0, max, true)
			};
		});
	}

	/**
	 *
	 */
	handleActivation(index) {
		if (this.state.active !== index) {
			this.setState({
				active: index
			});
		}
	}

	/**
	 *
	 */
	handlePrevious() {
		this.activateSibling(-1);
	}

	/**
	 *
	 */
	handleNext() {
		this.activateSibling(1);
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
		return Children.map(this.props.children, (child, i) => (
			<Tab
				key={'tab-' + child.props.name}
				ref={this.ref(i)}
				id={this.props.id}
				name={child.props.name}
				title={child.props.title}
				active={this.state.active === i}
				onActive={this.handleActivation}
				onPrevious={this.handlePrevious}
				onNext={this.handleNext}
				index={i}
			/>
		));
	}

	/**
	 *
	 */
	renderPanels() {
		return Children.map(this.props.children, (child, i) => {
			return addons.cloneWithProps(child, {
				key: 'panel-' + child.props.name,
				id: this.props.id,
				active: (this.state.active === i)
			});
		});
	}
}



/**
 *
 */
Tabs.propTypes = {
	id: PropTypes.string
};

/**
 *
 */
Tabs.defaultProps = {
	id: 'rea11y-' + uid()
};
