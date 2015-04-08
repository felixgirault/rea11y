/**
 *
 */
'use strict';

import React from 'react';
import bindMethods from '../utils/bindMethods';
import Tab from './Tab';



/**
 *
 */
export default class Tabs extends React.Component {

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

			React.findDOMNode(active).focus();
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
	handleActivation(index) {
		if (index !== this.state.active) {
			this.setState({
				active: index
			});
		}
	}

	/**
	 *
	 */
	handlePrevious(index) {
		const max = React.Children.count(this.props.children) - 1;
		const previous = (index > 0)
			? index - 1
			: max;

		this.setState({
			active: previous
		});
	}

	/**
	 *
	 */
	handleNext(index) {
		const max = React.Children.count(this.props.children) - 1;
		const next = (index < max)
			? index + 1
			: 0;

		this.setState({
			active: next
		});
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

				<div className="rea11y-tab-panel-list">
					{this.renderTabPanels()}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	renderTabs() {
		return React.Children.map(this.props.children, (child, i) => (
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
	renderTabPanels() {
		return React.Children.map(this.props.children, (child, i) => {
			return React.addons.cloneWithProps(child, {
				key: 'tab-panel-' + child.props.name,
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
	id: React.PropTypes.string
};

/**
 *
 */
Tabs.defaultProps = {
	id: 'rea11y-tabs'
};
