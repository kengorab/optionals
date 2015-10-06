var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('isEmpty', function() {
    describe('Some', function() {
        it('should be false', function() {
            var v = new Some(12);
            assert.isFalse(v.isEmpty());
        });

        it('should be false, even if option value is falsy', function() {
            var v = new Some(null);
            assert.isFalse(v.isEmpty());
        });
    });

    describe('None', function() {
        it('should be true', function() {
            var v = new None();
            assert.isTrue(v.isEmpty());
        });
    });
});
