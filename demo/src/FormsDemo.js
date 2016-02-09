import React from 'react';
import {FormField} from 'rea11y-forms';



/**
 *
 */
export default function FormsDemo() {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Forms</h2>
			</header>

			<p>
				The FormField component enriches any type of
				form input with a label, and optionally a
				hint and an error message, each of which
				beeing linked with the input using {' '}
				<code>aria-labelledby</code>.
			</p>

			<p>
				If an error message is set, the input is marked
				as invalid using <code>aria-invalid</code>.
			</p>

			<div className="pattern-example">
				<FormField
					name="email"
					label="Email address"
					hint="For example: john.doe@example.com"
					error="Please enter a valid email address"
				>
					<input type="email" />
				</FormField>
			</div>
		</article>
	);
}
