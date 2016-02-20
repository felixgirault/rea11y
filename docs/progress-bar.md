Progress bar
============

```jsx
import {ProgressBar} from 'rea11y';

<ProgressBar
    min={0}
    max={100}
    value={42} // required
/>
```

With a custom text:

```jsx
function makeText({value, max}) {
	return `${value}/${max}`;
}

<ProgressBar max={100} value={42} makeText={makeText} />
```

With a target element:

```jsx
<div id="target" />

<ProgressBar>
    <ProgressBarTarget targetId="target" />
</ProgressBar>
```
