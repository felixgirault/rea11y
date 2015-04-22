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
function label(state) {
	return state.progress + '%';
}

<ProgressBar max={100} value={42} text={label} />
```

### Tabs

```jsx
<Tabs>
	<TabPanel name="first" title="First">
		<p>Lorem ipsum dolor sit amet.</p>
	</TabPanel>

	<TabPanel name="second" title="Second">
		<p>Lorem ipsum dolor sit amet.</p>
	</TabPanel>
</Tabs>
```
