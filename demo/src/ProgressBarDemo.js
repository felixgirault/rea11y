import React from 'react';
import {ProgressBar} from '../../index';



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
				<ProgressBar target={null} value={value} />
			</div>

			<div id="progress-bar-target" className="progress-bar-target">
				<p>
					When a progress bar indicates the loading
					state of a particular zone in the page,
					it sets an <code>aria-busy="true"</code>
					{' '} attribute on the zone.
				</p>
				<p>
					For example, this zone will turn green
					only when the bar is full or empty, i.e.
					when <code>aria-busy="false"</code>.
				</p>
				<p>Move the slider below to try it out.</p>
			</div>
		</article>
	);
}
