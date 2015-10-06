var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('filter', function() {
    describe('Some', function() {
        it('should pass the option value into the predicate', function() {
            var v = new Some('value');
            v.filter(function(val) { assert.equal(val, 'value'); });
        });

        it('should be a `Some` of the value if predicate is true', function() {
            var v = new Some(12);
            var opt = v.filter(function() { return true; });
            assert.deepEqual(opt, new Some(12))
        });
    });

    describe('None', function() {
        it('should be `None`', function() {
            var v = new None();
            assert.deepEqual(v.filter(function() { return 'anything'; }), new None());
        });

        it('should not invoke predicate function', function() {
            var v = new None();
            v.filter(function() { assert.fail(); });
        });
    });
});
