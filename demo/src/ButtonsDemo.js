import React from 'react';
import {Button, StatefulToggleButton} from '../../src';



/**
 *
 */
export default function ButtonsDemo() {
	return (
		<article className="Pattern">
			<header>
				<h2 className="Pattern-name">Buttons</h2>
			</header>

			<div className="Pattern-example">
				<Button text="Button" />
			</div>

			<div className="Pattern-example">
				<StatefulToggleButton
					text="Toggle button"
					pressedText="Pressed toggle button"
				/>
			</div>
		</article>
	);
}
