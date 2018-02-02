import React, {Component, Children, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import classNames from 'classnames';
import {bindAll, uniqueId} from 'lodash';
import bound from './utils/bound';
import Tab from './Tab';



/**
 *
 */
function makeDefaultTabId(id, name) {
	return `${id}-tab-${name}`;
}

/**
 *
 */
function makeDefaultPanelId(id, name) {
	return `${id}-panel-${name}`;
}



/**
 *
 */
class Tabs extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		active: PropTypes.string,
		onActive: PropTypes.func,
		makeTabId: PropTypes.func,
		makePanelId: PropTypes.func,
		children: PropTypes.any.isRequired
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		makeTabId: makeDefaultTabId,
		makePanelId: makeDefaultPanelId
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);
		bindAll(
			this,
			'handleActive',
			'handlePrevious',
			'handleNext'
		);

		this.id = uniqueId('rea11y-');
	}

	/**
	 *
	 */
	componentDidUpdate(previousProps) {
		if (previousProps.active !== this.props.active) {
			const active = this.refs[this.props.active];
			findDOMNode(active).focus();
		}
	}

	/**
	 *
	 */
	tabNames() {
		return Children.map(
			this.props.children,
			(child) => child.props.name
		);
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
	renderTabs() {
		const {active, makeTabId, makePanelId, children} = this.props;

		return Children.map(children, (child) => {
			const {name, title} = child.props;

			return (
				<Tab
					key={name}
					ref={name}
					id={makeTabId(this.id, name)}
					panelId={makePanelId(this.id, name)}
					name={name}
					title={title}
					active={active === name}
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
		const {active, makeTabId, makePanelId, children} = this.props;

		return Children.map(children, (child) => {
			const {name} = child.props;

			return cloneElement(child, {
				key: name,
				active: (active === name),
				id: makePanelId(this.id, name),
				tabId: makeTabId(this.id, name)
			});
		});
	}

	/**
	 *
	 */
	render() {
		const className = classNames(
			'rea11y-Tabs',
			`rea11y-Tabs--${this.props.orientation}`
		);

		return (
			<div className={className}>
				<div className="rea11y-Tabs-tabList" role="tablist">
					{this.renderTabs()}
				</div>

				<div className="rea11y-Tabs-panelList">
					{this.renderPanels()}
				</div>
			</div>
		);
	}
}



export default pure(Tabs);
