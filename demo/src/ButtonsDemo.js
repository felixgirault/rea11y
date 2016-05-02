import React from 'react';
import {Button, StatefulToggleButton} from '../../src';



/**
 *
 */
export default function ButtonsDemo() {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Buttons</h2>
			</header>

			<div className="pattern-example">
				<Button text="Button" />
			</div>

			<div className="pattern-example">
				<StatefulToggleButton
					text="Toggle button"
					pressedText="Pressed toggle button"
				/>
			</div>
		</article>
	);
}
