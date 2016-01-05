Rea11y number input
===================

```js
import {NumberInput} from 'rea11y-number-input';
```

```jsx
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
