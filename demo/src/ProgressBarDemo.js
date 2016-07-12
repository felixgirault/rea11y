import React, {PropTypes} from 'react';
import {ProgressBar} from '../../src';



/**
 *
 */
export default function ProgressBarDemo({value}) {
	return (
		<article className="Pattern">
			<header>
				<h2 className="Pattern-name">Progress bar</h2>
			</header>

			<div className="Pattern-example">
				<ProgressBar value={value} />
			</div>
		</article>
	);
}

ProgressBarDemo.propTypes = {
	value: PropTypes.number.isRequired
};
