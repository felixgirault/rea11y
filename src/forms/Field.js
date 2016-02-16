import React, {PropTypes, Children, cloneElement} from 'react';
import createFragment from 'react-addons-create-fragment';
import classNames from 'classnames';
import sortObject from '../utils/sortObject';



/**
 *
 */
export default function Field({
	children,
	name,
	label,
	hint = '',
	error = '',
	required = false,
	order = [
		Field.LABEL,
		Field.HINT,
		Field.ERROR,
		Field.INPUT
	]
}) {
	const input = Children.only(children);
	const id = `rea11y-form-${name}`;
	const inputId = `${id}-input`;
	const labelId = `${id}-label`;
	const labels = [labelId];

	const components = {
		[Field.LABEL]: (
			<label
				id={labelId}
				className="rea11y-form-label"
				htmlFor={inputId}
			>
				{label}
			</label>
		)
	};

	if (hint) {
		const hintId = `${id}-hint`;

		labels.push(hintId);
		components[Field.HINT] = (
			<p id={hintId} className={`rea11y-form-hint`}>
				{hint}
			</p>
		);
	}

	if (error) {
		const errorId = `${id}-error`;

		labels.push(errorId);
		components[Field.ERROR] = (
			<p id={errorId} className={`rea11y-form-error`}>
				{error}
			</p>
		);
	}

	const inputProps = {
		id: inputId,
		name: inputId,
		className: 'rea11y-form-input',
		'aria-labelledby': labels.join(' ')
	};

	if (required) {
		inputProps.required = true;
		inputProps['aria-required'] = true;
	}

	if (error) {
		inputProps['aria-invalid'] = true;
	}

	components[Field.INPUT] = cloneElement(input, inputProps);

	const fragment = createFragment(
		sortObject(components, order)
	);

	const className = classNames(
		'rea11y-form-field',
		`rea11y-form-field-${name}`
	);

	return (
		<div className={className}>
			{fragment}
		</div>
	);
}

/**
 *
 */
Field.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	hint: PropTypes.string,
	error: PropTypes.string,
	required: PropTypes.bool,
	children: PropTypes.element.isRequired
};

/**
 *
 */
Field.LABEL = 'label';
Field.HINT = 'hint';
Field.ERROR = 'error';
Field.INPUT = 'input';
