import React from 'react';
import {Field} from '../../src';



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
				The <code>Field</code> component enriches
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
				<Field
					name="email"
					label="Email address"
					hint="For example: john.doe@example.com"
					error="Please enter a valid email address"
					required
				>
					<input type="email" />
				</Field>
			</div>

			<p>
				Also note that the different field components
				can be reordered at will.
			</p>

			<div className="pattern-example">
				<Field
					name="email"
					label="Email address"
					hint="This is a stupid example"
					error="Please enter a valid email address"
					order={[Field.ERROR, Field.LABEL, Field.INPUT, Field.HINT]}
					required
				>
					<input type="email" />
				</Field>
			</div>
		</article>
	);
}
