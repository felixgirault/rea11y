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

Then head to [http://localhost:8080](http://localhost:8080).

Components
----------

### Progress bar

```jsx
<Progress max={100} value={42} />
```

With a label:

```jsx
function label(state) {
	return state.progress + '%';
}

<Progress max={100} value={42} text={label} />
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
