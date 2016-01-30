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
function makeText({progress}) {
	return progress + '%';
}

<ProgressBar max={100} value={42} text={makeText} />
```
