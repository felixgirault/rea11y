import React from 'react';
import {Slider} from '../../src';



/**
 *
 */
export default function SlidersDemo(props) {
	return (
		<article className="Pattern">
			<header>
				<h2 className="Pattern-name">Slider</h2>
			</header>

			<ul className="Pattern-interactions">
				<li className="Pattern-interaction">
					<span>Decrement the value</span>
					<span>
						<kbd title="Left arrow">←</kbd> {' '}
						<kbd title="Down arrow">↓</kbd>
					</span>
				</li>
				<li className="Pattern-interaction">
					<span>Increment the value</span>
					<span>
						<kbd title="Right arrow">→</kbd> {' '}
						<kbd title="Up arrow">↑</kbd>
					</span>
				</li>
				<li className="Pattern-interaction">
					<span>Decrement the value by a larger amount</span>
					<span><kbd>Page down</kbd></span>
				</li>
				<li className="Pattern-interaction">
					<span>Increment the value by a larger amount</span>
					<span><kbd>Page up</kbd></span>
				</li>
				<li className="Pattern-interaction">
					<span>Set the value to the minimum</span>
					<span><kbd>Home</kbd></span>
				</li>
				<li className="Pattern-interaction">
					<span>Set the value to the maximum</span>
					<span><kbd>End</kbd></span>
				</li>
			</ul>

			<div className="Pattern-example">
				<Slider {...props} />
			</div>
		</article>
	);
}
