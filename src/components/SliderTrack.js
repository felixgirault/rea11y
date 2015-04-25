/**
 *
 */
'use strict';

import {Component, Children, findDOMNode, cloneElement} from 'react';
import classNames from 'classnames';
import offset from 'dom-helpers/query/offset';
import bindMethods from '../utils/bindMethods';
import SliderHandle from './SliderHandle';



/**
 *
 */
export default class SliderTrack extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'offset',
			'renderHandle'
		);
	}

	/**
	 *
	 */
	offset() {
		return offset(findDOMNode(this));
	}

	/**
	 *
	 */
	render() {
		return (
			<div className="rea11y-slider-track">
				{Children.map(
					this.props.children,
					this.renderHandle
				)}
			</div>
		);
	}

	/**
	 *
	 */
	renderHandle(handle) {
		return cloneElement(handle, {
			trackOffset: this.offset
		});
	}
}
