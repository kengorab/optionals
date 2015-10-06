var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('exists', function() {
    describe('Some', function() {
        it('should pass the option value into the predicate function', function() {
            var v = new Some('value');
            v.exists(function(value) { assert.equal(value, 'value'); });
        });

        it('should be true if passed function returns true', function() {
            var v = new Some(12);
            assert.isTrue(v.exists(function() { return true; }));
        });
    });

    describe('None', function() {
        it('should be false', function() {
            var v = new None();
            assert.isFalse(v.exists(function() { return 'anything'; }));
        });

        it('should not invoke predicate function', function() {
            var v = new None();
            v.exists(function() { assert.fail(); });
        });
    });
});
