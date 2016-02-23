/**
 *
 */
import {expect} from 'chai';
import {keys} from 'lodash';
import sortObject from '../../src/utils/sortObject';



/**
 *
 */
describe('sortObject', function() {

	/**
	 *
	 */
	it('should sort an object', function() {
		const order = ['c', 'a', 'b'];
		const object = {
			a: 1,
			b: 2,
			c: 3
		};

		const sorted = sortObject(object, order);

		expect(keys(sorted)).to.deep.equal(order);
		expect(sorted).to.deep.equal({
			c: 3,
			a: 1,
			b: 2
		});
	});

	/**
	 *
	 */
	it('should omit unset keys in object', function() {
		const order = ['a', 'c'];
		const object = {
			a: 1,
			b: 2
		};

		const sorted = sortObject(object, order);

		expect(sorted).to.deep.equal({
			a: 1
		});
	});

	/**
	 *
	 */
	it('should omit unset keys in order', function() {
		const order = ['a'];
		const object = {
			a: 1,
			b: 2
		};

		const sorted = sortObject(object, order);

		expect(sorted).to.deep.equal({
			a: 1
		});
	});
});
