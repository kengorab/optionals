var chai = require('chai'),
    assert = chai.assert;
var option = require('../lib'),
    Some = option.Some,
    None = option.None;

describe('match', function() {
    describe('when Option is Some', function() {
        it('should call the `some` function', function() {
            var value = new Some(12);
            value.match({
                some: function() { assert.ok(true); },
                none: function() { assert.fail(); }
            });
        });

        it('should return the result of the `some` function', function() {
            var value = new Some([1, 2, 3]);
            var matched = value.match({
                some: function(arr) { return arr.map(function(a) { return a + 1; }) },
                none: function() { assert.fail(); }
            });
            assert.deepEqual(matched, [2, 3, 4]);
        });

        it('should pass the value into the `some` function', function() {
            var value = new Some('hello');
            value.match({
                some: function(v) { assert.equal(v, 'hello'); },
                none: function() { assert.fail(); }
            });
        });
    });

    describe('when Option is None', function() {
        it('should call the `none` function', function() {
            var value = new None();
            value.match({
                some: function() { assert.fail(); },
                none: function() { assert.ok(true); }
            });
        });

        it('should return the result of the `none` function', function() {
            var value = new None();
            var matched = value.match({
                some: function() { assert.fail(); },
                none: function() { return 'result'; }
            });
            assert.equal(matched, 'result');
        });
    });
});
