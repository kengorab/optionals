var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('contains', function() {
    describe('Some', function() {
        it('should be true if value matches option value', function() {
            var v = new Some(12);
            assert.isTrue(v.contains(12));
        });

        it('should be false if value does not match option value', function() {
            var v = new Some('12');
            assert.isFalse(v.contains(12));
        });
    });

    describe('None', function() {
        it('should be false for any value', function() {
            var v = new None();
            assert.isFalse(v.contains('anything could go here'));
        });

        it('should not invoke predicate function', function() {
            var v = new None();
            v.contains(function() { assert.fail(); });
        });
    });
});
