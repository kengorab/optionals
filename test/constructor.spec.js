var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('constructors', function() {
    describe('Some', function() {
        it('should assign the value', function() {
            var v = new Some(123);
            assert.equal(v.value, 123);
        });
    });

    describe('None', function() {
        it('should assign no value', function() {
            var v = new None();
            assert.isUndefined(v.value);
        });
    });
});
