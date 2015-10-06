var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('orNull', function() {
    describe('Some', function() {
        it('should return the option value', function() {
            var v = new Some(12);
            assert.equal(v.orNull(), 12);
        });
    });

    describe('None', function() {
        it('should be null', function() {
            var v = new None();
            assert.deepEqual(v.orNull(), null);
        });
    });
});
