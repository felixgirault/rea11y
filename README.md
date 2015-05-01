Rea11y
========

A set of accessible React components.

Demo
----

Install the required dependencies and build the project:

```sh
npm install
npm start
```

Then head to [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/).

Usage
-----

```jsx
// ES5
var Rea11y = require('rea11y');
var Slider = Rea11y.Slider;

// ES6
import Rea11y from 'rea11y';
import {Slider} from 'rea11y';
```

Components
----------

### Progress bar

```jsx
<ProgressBar max={100} value={42} />
```

With a label:

```jsx
function makeText(props) {
	return props.progress + '%';
}

<ProgressBar max={100} value={42} text={makeText} />
```

### Slider

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

### Range slider

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

### Tabs

```jsx
<Tabs>
	<Panel name="first" title="First">
		<p>Lorem ipsum dolor sit amet.</p>
	</Panel>

	<Panel name="second" title="Second">
		<p>Lorem ipsum dolor sit amet.</p>
	</Panel>
</Tabs>
```
