import React from 'react';
import {NumberInput, NumberInputControls} from '../../src';



/**
 *
 */
export default function NumberInputDemo(props) {
	return (
		<article className="Pattern">
			<header>
				<h2 className="Pattern-name">Number input</h2>
			</header>

			<ul className="Pattern-interactions">
				<li className="Pattern-interaction">
					<span>Decrement the value</span>
					<span>
						<kbd title="Down arrow">↓</kbd>
					</span>
				</li>
				<li className="Pattern-interaction">
					<span>Increment the value</span>
					<span>
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
				<NumberInput {...props} />
			</div>

			<div className="Pattern-example">
				<NumberInput {...props}>
					<NumberInputControls />
				</NumberInput>
			</div>
		</article>
	);
}
