# NumberInput

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
