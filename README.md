Reaccess
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

With a string template:

```jsx
<Progress max={100} value={42} text=":progress%" />
```

With a templating function:

```jsx
function progressText(progress) {
	return progress + '%';
}

<Progress max={100} value={42} text={progressText} />
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
