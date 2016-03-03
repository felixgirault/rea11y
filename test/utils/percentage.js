/**
 *
 */
import percentage from '../../src/utils/percentage';



/**
 *
 */
describe('percentage', function() {

	/**
	 *
	 */
	it('should calculate a percentage', function() {
		expect(percentage(-50, 100, 0)).to.equal(0);
		expect(percentage(150, 100, 0)).to.equal(100);
		expect(percentage(150, 200, 0)).to.equal(75);

		expect(percentage(0, 100, 50)).to.equal(0);
		expect(percentage(150, 100, 50)).to.equal(100);
		expect(percentage(75, 100, 50)).to.equal(50);
	});
});
