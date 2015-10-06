var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('isDefined', function() {
    describe('Some', function() {
        it('should be true', function() {
            var v = new Some();
            assert.isTrue(v.isDefined());
        });

        it('should be true, even if option value is falsy', function() {
            var v = new Some(null);
            assert.isTrue(v.isDefined());
        });
    });

    describe('None', function() {
        it('should be false', function() {
            var v = new None(12);
            assert.isFalse(v.isDefined());
        });

    });
});
