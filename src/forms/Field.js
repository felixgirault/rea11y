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
	const id = `r1y-Field-${name}`;
	const inputId = `${id}-input`;
	const labelId = `${id}-label`;
	const labels = [labelId];

	const components = {
		[Field.LABEL]: (
			<label
				id={labelId}
				className="r1y-Field-label"
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
			<p id={hintId} className="r1y-Field-hint">
				{hint}
			</p>
		);
	}

	if (error) {
		const errorId = `${id}-error`;

		labels.push(errorId);
		components[Field.ERROR] = (
			<p id={errorId} className="r1y-Field-error">
				{error}
			</p>
		);
	}

	const inputProps = {
		id: inputId,
		name: inputId,
		className: 'r1y-Field-input',
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
		'r1y-Field',
		`r1y-Field-${name}`
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
Field.LABEL = 'label';
Field.HINT = 'hint';
Field.ERROR = 'error';
Field.INPUT = 'input';

/**
 *
 */
Field.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	hint: PropTypes.string,
	error: PropTypes.string,
	required: PropTypes.bool,
	order: PropTypes.arrayOf(
		PropTypes.oneOf([
			Field.LABEL,
			Field.HINT,
			Field.ERROR,
			Field.INPUT
		])
	),
	children: PropTypes.element.isRequired
};
