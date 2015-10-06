var Some = (function () {
    function Some(val) {
        this.value = val;
    }
    Some.prototype.get = function () {
        return this.value;
    };
    Some.prototype.isEmpty = function () {
        return false;
    };
    Some.prototype.isDefined = function () {
        return true;
    };
    Some.prototype.contains = function (value) {
        return this.value === value;
    };
    Some.prototype.exists = function (predicate) {
        return predicate(this.value);
    };
    Some.prototype.filter = function (predicate) {
        if (predicate(this.value)) {
            return this;
        }
        else {
            return new None();
        }
    };
    Some.prototype.flatMap = function (transformer) {
        return transformer(this.value);
    };
    Some.prototype.map = function (transformer) {
        return new Some(transformer(this.value));
    };
    Some.prototype.flatten = function () {
        if (!!this.value['flatten']) {
            var innerOpt = this.value;
            return innerOpt.flatten();
        }
        else {
            return new Some(this.value);
        }
    };
    Some.prototype.getOrElse = function (other) {
        return this.value;
    };
    Some.prototype.orNull = function () {
        return this.value;
    };
    Some.prototype.match = function (matcher) {
        return matcher.some(this.value);
    };
    return Some;
})();
exports.Some = Some;
var None = (function () {
    function None() {
    }
    None.prototype.get = function () {
        return undefined;
    };
    None.prototype.isEmpty = function () {
        return true;
    };
    None.prototype.isDefined = function () {
        return false;
    };
    None.prototype.contains = function (value) {
        return false;
    };
    None.prototype.exists = function (predicate) {
        return false;
    };
    None.prototype.filter = function (predicate) {
        return new None();
    };
    None.prototype.flatMap = function (transformer) {
        return new None();
    };
    None.prototype.flatten = function () {
        return new None();
    };
    None.prototype.map = function (transformer) {
        return new None();
    };
    None.prototype.getOrElse = function (other) {
        return other;
    };
    None.prototype.orNull = function () {
        return null;
    };
    None.prototype.match = function (matcher) {
        return matcher.none();
    };
    return None;
})();
exports.None = None;
//# sourceMappingURL=option.js.map