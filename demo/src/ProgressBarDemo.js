import React from 'react';
import {ProgressBar, ProgressBarTarget} from '../../index';



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
				<ProgressBar target={null} value={value}>
					<ProgressBarTarget targetId="progress-bar-target" />
				</ProgressBar>
			</div>

			<div id="progress-bar-target" className="progress-bar-target">
				<p>
					A progress bar can optionally indicate
					the loading state of a particular zone
					in the page.
					It does so by setting an <code>aria-busy="true"</code>
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
