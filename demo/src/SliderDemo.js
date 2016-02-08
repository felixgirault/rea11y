import React from 'react';
import {StatefulSlider} from 'rea11y-sliders';



/**
 *
 */
export default function SlidersDemo({defaultValue, onChange}) {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Slider</h2>
			</header>

			<ul className="pattern-interactions">
				<li className="pattern-interaction">
					<span>Decrement the value</span>
					<span>
						<kbd title="Left arrow">←</kbd> {' '}
						<kbd title="Down arrow">↓</kbd>
					</span>
				</li>
				<li className="pattern-interaction">
					<span>Increment the value</span>
					<span>
						<kbd title="Right arrow">→</kbd> {' '}
						<kbd title="Up arrow">↑</kbd>
					</span>
				</li>
				<li className="pattern-interaction">
					<span>Decrement the value by a larger amount</span>
					<span><kbd>Page down</kbd></span>
				</li>
				<li className="pattern-interaction">
					<span>Increment the value by a larger amount</span>
					<span><kbd>Page up</kbd></span>
				</li>
				<li className="pattern-interaction">
					<span>Set the value to the minimum</span>
					<span><kbd>Home</kbd></span>
				</li>
				<li className="pattern-interaction">
					<span>Set the value to the maximum</span>
					<span><kbd>End</kbd></span>
				</li>
			</ul>

			<div className="pattern-example">
				<StatefulSlider
					min={0}
					max={100}
					defaultValue={defaultValue}
					onChange={onChange}
				/>
			</div>
		</article>
	);
}
