import React, {PropTypes, Children, cloneElement} from 'react';
import classNames from 'classnames';



/**
 *
 */
export default function FormField({name, label, hint, error, children}) {
	const input = Children.only(children);
	const id = `rea11y-form-${name}`;
	const inputId = `${id}-input`;
	const labelId = `${id}-label`;
	const labels = [labelId];

	let hintMessage;
	let errorMessage;

	if (hint) {
		const hintId = `${id}-hint`;
		labels.push(hintId);

		hintMessage = (
			<p id={hintId} className={`rea11y-form-hint`}>
				{hint}
			</p>
		);
	}

	if (error) {
		const errorId = `${id}-error`;
		labels.push(errorId);

		errorMessage = (
			<p id={errorId} className={`rea11y-form-error`}>
				{error}
			</p>
		);
	}

	const props = {
		id,
		name: id,
		className: 'rea11y-form-input',
		'aria-labelledby': labels.join(' ')
	};

	if (error) {
		props['aria-invalid'] = true;
	}

	const className = classNames(
		'rea11y-form-field',
		`rea11y-form-field-${name}`
	);

	return (
		<div className={className}>
			<label
				id={labelId}
				className="rea11y-form-label"
				htmlFor={id}
			>
				{label}
			</label>

			{hintMessage}
			{errorMessage}
			{cloneElement(input, props)}
		</div>
	);
}

/**
 *
 */
FormField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	hint: PropTypes.string,
	error: PropTypes.string,
	children: PropTypes.element.isRequired
};

/**
 *
 */
FormField.defaultProps = {
	hint: '',
	error: ''
};
