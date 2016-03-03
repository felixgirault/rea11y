/**
 *
 */
import bound from '../../src/utils/bound';



/**
 *
 */
describe('bound', function() {

	/**
	 *
	 */
	it('should keep a value between bounds', function() {
		expect(bound(0, -50, 50)).to.equal(0);
		expect(bound(100, -50, 50)).to.equal(50);
		expect(bound(-100, -50, 50)).to.equal(-50);
	});

	/**
	 *
	 */
	it('should keep a value between bounds circularly', function() {
		expect(bound(0, -50, 50, true)).to.equal(0);
		expect(bound(100, -50, 50, true)).to.equal(-50);
		expect(bound(-100, -50, 50, true)).to.equal(50);
	});
});
