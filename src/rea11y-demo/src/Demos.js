import React, {Component} from 'react';
import autoBind from 'autobind-decorator';
import NumberInputDemo from './NumberInputDemo';
import ProgressBarDemo from './ProgressBarDemo';
import SliderDemo from './SliderDemo';
import RangeSliderDemo from './RangeSliderDemo';
import TabsDemo from './TabsDemo';
import ButtonsDemo from './ButtonsDemo';
import ModalDemo from './ModalDemo';



/**
 *
 */
export default class Demos extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: 42
		};
	}

	@autoBind
	handleValueChange(value) {
		this.setState({value});
	}

	render() {
		return (
			<div>
				<header className="page-header" role="banner">
					<h1 id="page-title" className="page-title">Rea11y</h1>
					<p>A set of accessible React components.</p>
				</header>

				<main className="page">
					<section aria-labelledby="page-title">
						<NumberInputDemo />
						<ProgressBarDemo value={this.state.value} />
						<SliderDemo
							defaultValue={this.state.value}
							onChange={this.handleValueChange}
						/>

						<RangeSliderDemo />
						<TabsDemo />
						<ButtonsDemo />
						<ModalDemo />
					</section>
				</main>

				<footer className="page-footer" role="contentinfo">
					<p>
						<a href="https://github.com/felixgirault/rea11y">
							Rea11y on Github
						</a>
					</p>

					{/* TODO: add a link to the NPM package */}

					<p>
						Colors from
						<a href="https://github.com/mrmrs/colors">
							mrmrs/colors
						</a>
					</p>
				</footer>
			</div>
		);
	}
}
