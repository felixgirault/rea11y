Rea11y slider
=============

```js
import {Slider, RangeSlider} from 'rea11y-slider';
```

Slider
------

```jsx
function makeText(props) {
	return props.value;
}

function handleChange(value) {
	console.log(value);
}

<Slider
	min={0}
	max={100}
	value={42}
	step={1}
	bigStep={10}
	text={makeText}
	onChange={handleChange}
/>
```

Range slider
------------

```jsx
function handleChange(upperValue, lowerValue) {
	console.log(upperValue, lowerValue);
}

<RangeSlider
	min={0}
	max={100}
	lowerValue={24}
	upperValue={96}
	step={1}
	bigStep={10}
	text={makeText}
	onChange={handleChange}
/>
```
