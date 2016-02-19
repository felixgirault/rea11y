Forms
=====

Form field
----------

```jsx
import {Field} from 'rea11y';

<Field
	name="email" // required
	label="Email address" // required
	hint="For example: john.doe@example.com"
	error="Please enter a valid email address"
	order={[
		Field.LABEL,
		Field.HINT,
		Field.ERROR,
		Field.INPUT
	]}
>
	<input type="email" />
</Field>
```

Number input
------------

```jsx
import {NumberInput, NumberInputControls} from 'rea11y';

function handleChange(value) {}

<NumberInput
	value={42} // required
	min={0}
	max={100}
	step={1}
	bigStep={10}
	onChange={handleChange}
/>

<NumberInput {...props}>
	<NumberInputControls
		incrementText="▲"
		decrementText="▼"
		incrementTitle="Increment"
		decrementTitle="Decrement"
	/>
</NumberInput>
```
