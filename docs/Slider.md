# Slider

```jsx
import {Slider} from 'rea11y';

function handleChange(values) {}
function makeText({value}) {
	return value;
}

<Slider
	min={0}
	max={100}
	values={[42]}
	step={1}
	bigStep={10}
	text={makeText}
	onChange={handleChange}
/>
```
