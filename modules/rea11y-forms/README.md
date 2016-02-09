Rea11y forms
============

Form field
----------

```jsx
import {FormField} from 'rea11y-forms';

<FormField
	name="email"
	label="Email address"
	hint="For example: john.doe@example.com"
	error="Please enter a valid email address"
>
	<input type="email" />
</FormField>
```

Number input
------------

```jsx
import {NumberInput} from 'rea11y-forms';

function handleChange(value) {
	console.log(value);
}

<NumberInput
	min={0}
	max={100}
	value={42}
	step={1}
	bigStep={10}
	incrementText="⌃"
	decrementText="⌃"
	incrementTitle="Increment"
	decrementTitle="Decrement"
	onChange={handleChange}
/>
```
