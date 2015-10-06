var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('flatten', function() {
    describe('Some', function() {
        it('should flatten a 1-level deep option into a `Some`', function() {
            var v = new Some(12);
            var newV = v.flatten();
            assert.deepEqual(newV, new Some(12));
        });

        it('should flatten a 2-level deep option into a `Some`', function() {
            var v = new Some(new Some([1, 2, 3]));
            var newV = v.flatten();
            assert.deepEqual(newV, new Some([1, 2, 3]));
        });

        it('should flatten an ultimately `None` option into a `None`', function() {
            var v = new Some(new Some(new Some(new Some(new Some(new None())))));
            var newV = v.flatten();
            assert.deepEqual(newV, new None());
        });
    });

    describe('None', function() {
        it('should be `None`', function() {
            var v = new None();
            var newV = v.flatten();
            assert.deepEqual(newV, new None());
        });
    });
});
