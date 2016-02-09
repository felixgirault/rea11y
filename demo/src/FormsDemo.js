import React from 'react';
import {FormField} from 'rea11y-forms';



/**
 *
 */
export default function FormsDemo() {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Form field</h2>
			</header>

			<p>
				The <code>FormField</code> component enriches
				any type of form input with a label, and
				optionally a hint and an error message, each
				of which beeing linked with the input using {' '}
				<code>aria-labelledby</code>.
			</p>

			<p>
				If an error message is set, the input is marked
				as invalid using <code>aria-invalid</code>.
			</p>

			<p>
				If the field is required, it is marked as such
				with both <code>aria-required</code> and {' '}
				<code>required</code>.
			</p>

			<div className="pattern-example">
				<FormField
					name="email"
					label="Email address"
					hint="For example: john.doe@example.com"
					error="Please enter a valid email address"
					required
				>
					<input type="email" />
				</FormField>
			</div>
		</article>
	);
}
