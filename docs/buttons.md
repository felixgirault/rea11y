Buttons
=======

Button
------

```jsx
import {Button} from 'rea11y';

<Button text="Click me" />
```

Toggle button
-------------

```jsx
import {ToggleButton} from 'rea11y';

function handleToggle(pressed) {}
function handlePress() {}
function handleRelease() {}

<ToggleButton
	pressed={true}
	text="Press me"
	pressedText="Release me"
	onToggle={handleToggle}
    onPress={handlePress}
    onRelease={handleRelease}
/>
```
