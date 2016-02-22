import React from 'react';
import {NumberInput, NumberInputControls} from '../../index';



/**
 *
 */
export default function NumberInputDemo(props) {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Number input</h2>
			</header>

			<ul className="pattern-interactions">
				<li className="pattern-interaction">
					<span>Decrement the value</span>
					<span>
						<kbd title="Down arrow">↓</kbd>
					</span>
				</li>
				<li className="pattern-interaction">
					<span>Increment the value</span>
					<span>
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
				<NumberInput {...props} />
			</div>

			<div className="pattern-example">
				<NumberInput {...props}>
					<NumberInputControls />
				</NumberInput>
			</div>
		</article>
	);
}
