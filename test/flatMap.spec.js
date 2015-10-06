var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('flatMap', function() {
    describe('Some', function() {
        it('should pass option value into predicate', function() {
            var v = new Some(12);
            v.flatMap(function(val) { assert.equal(val, 12); });
        });

        it('should return result of predicate', function() {
            var v = new Some([1, 2, 3]);
            var newArr = v.flatMap(function(arr) { return new Some(arr.map(function(a) { return a + 1; }))});
            assert.deepEqual(newArr, new Some([2, 3, 4]));
        });
    });

    describe('None', function() {
        it('should be `None`', function() {
            var v = new None();
            var newV = v.flatMap(function() { return 'anything'; });
            assert.deepEqual(newV, new None());
        });

        it('should not invoke predicate function', function() {
            var v = new None();
            v.flatMap(function() { assert.fail(); });
        });
    });
});
