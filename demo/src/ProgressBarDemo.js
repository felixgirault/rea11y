import React, {PropTypes} from 'react';
import {ProgressBar} from '../../src';



/**
 *
 */
export default function ProgressBarDemo({value}) {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Progress bar</h2>
			</header>

			<div className="pattern-example">
				<ProgressBar value={value} />
			</div>
		</article>
	);
}

ProgressBarDemo.propTypes = {
	value: PropTypes.number.isRequired
};
