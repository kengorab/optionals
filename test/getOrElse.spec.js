var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('getOrElse', function() {
    describe('Some', function() {
        it('should return the value of the option', function() {
            var v = new Some(12);
            var value = v.getOrElse('default option');
            assert.equal(value, 12);
        });

        it('should return the value of the option, even if null/undefined', function() {
            [null, undefined].forEach(function(it) {
                var v = new Some(it);
                var value = v.getOrElse('default option');
                assert.equal(value, it);
            });
        });
    });

    describe('None', function() {
        it('should be the other provided value', function() {
            var v = new None();
            var newV = v.getOrElse('default option');
            assert.equal(newV, 'default option');
        });
    });
});
