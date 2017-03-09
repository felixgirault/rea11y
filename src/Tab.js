import React, {PropTypes} from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';
import {ARROW, HOME, END} from 'offkey';
import {noop} from 'lodash';
import KeyHandler from './KeyHandler';



/**
 *
 */
const Tab = ({
	id,
	panelId,
	name,
	title,
	active,
	onActive,
	onFirst,
	onLast,
	onPrevious,
	onNext
}) => {
	const handleClick = () => onActive(name);
	const handlePrevious = () => onPrevious(name);
	const handleNext = () => onNext(name);

	const className = classNames({
		'rea11y-Tab': true,
		'rea11y-Tab--active': active,
		[`rea11y-Tab-${name}`]: true
	});

	return (
		<KeyHandler
			handlers={{
				[HOME]: onFirst,
				[END]: onLast,
				[ARROW.UP]: handlePrevious,
				[ARROW.LEFT]: handlePrevious,
				[ARROW.DOWN]: handleNext,
				[ARROW.RIGHT]: handleNext
			}}
		>
			<button
				id={id}
				className={className}
				role="tab"
				aria-controls={panelId}
				aria-selected={active}
				onClick={handleClick}
				tabIndex={active ? 0 : -1}
			>
				{title}
			</button>
		</KeyHandler>
	);
};

Tab.propTypes = {
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

Tab.defaultProps = {
	active: false,
	onActive: noop,
	onFirst: noop,
	onLast: noop,
	onPrevious: noop,
	onNext: noop
};



export default pure(Tab);
