import uniqueId from '../../src/utils/uniqueId';



/**
 *
 */
describe('uniqueId', function() {

	/**
	 *
	 */
	it('should generate incremental unique ids', function() {
		expect(uniqueId()).to.equal('rea11y-0');
		expect(uniqueId()).to.equal('rea11y-1');
		expect(uniqueId()).to.equal('rea11y-2');
	});
});
