Rea11y progress bar
===================

```js
import {ProgressBar} from 'rea11y-progress-bar';
```

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
