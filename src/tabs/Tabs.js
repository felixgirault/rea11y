/**
 *
 */
import React, {Component, Children, PropTypes, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import {uniqueId} from 'lodash';
import bound from '../utils/bound';
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
@pureRender
export default class Tabs extends Component {

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
	@autoBind
	handleActive(name) {
		this.emitActive(name);
	}

	/**
	 *
	 */
	@autoBind
	handlePrevious(name) {
		this.activateSibling(name, -1);
	}

	/**
	 *
	 */
	@autoBind
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
			'rea11y-tabs',
			`rea11y-tabs-${this.props.orientation}`
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
}
