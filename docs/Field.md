# Field

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
