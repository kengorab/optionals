Optionals
=========

An implementation of Scala's [Option](http://www.scala-lang.org/api/current/index.html#scala.Option) type, written in javascript, with included type definition files for use in typescript.

[![Build Status](https://travis-ci.org/KenGorab/optionals.svg?branch=master)](https://travis-ci.org/KenGorab/optionals)

_______

## Constructors
An Option represents a container which holds at most 1 value; it can either hold some value, or it can hold none. As such, there are two constructors for an Option, `Some` and `None`. Use `Some` when you have a definite value, and use `None` otherwise.

Example (in typescript):
```javascript
import {Some, None, Option} from 'optionals';

export function getContactForPhoneNumber(number: String): Option<String> {
    if (hasContactForNumber(number)) {
        let contact = getContactForNumber(number);
        return new Some(contact);
    }
    else {
        return new None();
    }
}
```
Then, from another file, we could say:
```javascript
import {getContactForPhoneNumber} from 'number-lookup-service';

let contact = getContactForPhoneNumber('867-5309').match({
    some: contact => doSomethingWithContact(contact),
    none: () => throwErrorOrDoSomethingElse()
});
```

This removes ambiguous if-statements and null-checks in a type-safe manner - anything returned from either branch of the `match` function must be of the same type (when using the provided typescript declaration files), so we know `contact` will have the correct type.

## The API

The following functions are implementations of the equivalent Scala Option functions, and they are:
  - [match](#match)
  - [get](#get)
  - [isEmpty](#isempty)
  - [isDefined](#isdefined)
  - [contains](#contains)
  - [exists](#exists)
  - [filter](#filter)
  - [flatMap](#flatmap)
  - [map](#map)
  - [flatten](#flatten)
  - [getOrElse](#getorelse)
  - [orNull](#ornull)

### match

`match<U>(matcher: { some: (val: T) => U, none: () => U }): U`

You saw the `match` function used above. One of the amazing things about Scala is its [pattern matching](http://docs.scala-lang.org/tutorials/tour/pattern-matching.html), which enables code such as:
```scala
val s = Some(123)
s match {
  case Some(v) => doSomethingWithTheValue(v)
  case None => throwErrorOrSomething()
}
```
Since the `match` keyword isn't part of javascript, this library does its best to emulate the functionality, with:
```javascript
let s = new Some(123);
s.match({
    some: v => doSomethingWithTheValue(v),
    none: () => throwErrorOrSomething()
});
```
While this library doesn't bring full-fledged pattern matching to javascript, it offers the functionality to Options - a functionality without which they would be fairly incomplete.

### get

`get(): T`

Returns the option's value, undefined if the option is `None`.

Example:
```javascript
let s = new Some(123);
s.get()   // 123
let n = new None();
n.get()  // undefined
```
### isEmpty

`isEmpty(): Boolean`

Returns true if the option is `None`, false otherwise.

Example:
```javascript
let s = new Some('Cinnamon');
s.isEmpty()  // false
let n = new None();
s.isEmpty()  // true
```

### isDefined

`isDefined(): Boolean`

Returns true if the option is an instance of `Some`, false otherwise.

`isDefined` is the negation of `isEmpty`, so an example isn't necessary.

### contains

`contains(value: T): Boolean`

Tests whether the option contains a given value as its element.

Example:
```javascript
let s = new Some([1, 2, 3]);
s.contains([1, 2, 3]);  // true
let n = new None();
n.contains('anything');  // false
```

### exists

`exists(predicate: (value: T) => Boolean): Boolean`

Returns true if this option is nonempty and the predicate returns true when applied to this option's value.

Example:
```javascript
let s = new Some([1, 2, 3]);
s.exists(val => _.contains(val, 2))  // true
let n = new None();
n.exists(val => _.contains(val, 2))  // false
```

### filter

`filter(predicate: (value: T) => Boolean): Option<T>`

Returns an option if it is nonempty and applying the predicate to this option's value returns true.

Example (same as above; note the difference in return type):
```javascript
let s = new Some([1, 2, 3]);
s.filter(val => _.contains(val, 2))  // new Some([1, 2, 3])
let n = new None();
n.filter(val => _.contains(val, 2))  // new None()
```

### flatMap

`flatMap<U>(transformer: (value: T) => Option<U>): Option<U>`

Returns the result of applying the transformer to this option's value if this option is nonempty.

Example:
```javascript
let s = new Some([1, 2, 3]);
s.flatMap(a => new Some(a[0]))  // new Some(1)
let n = new None();
n.flatMap(a => new Some(a[0]))  // new None()
```
### map

`map<U>(transformer: (value: T) => U): Option<U>`

Returns an option containing the result of applying the transformer to this option's value if this option is nonempty.

Example (again, same as above; note the difference in return type of `transformer`):
```javascript
let s = new Some([1, 2, 3]);
s.map(a => a[0])  // new Some(1)
let n = new None();
n.map(a => a[0])  // new None()
```

In using `map` and `flatMap`, you really begin to see the power and flexibility of using Options in your code - the eliminate a lot of null-checks and allow you to perform operations on values as if you were certain you had them. Leave it up to the Option to do the resolution for you.

### flatten

`flatten<U>(): Option<U>`

Collapse nested options into an option at most 1-layer deep.

Example:
```javascript
let nested = new Some(new Some(new Some(123)));
nested.flatten()  // new Some(123)
```

### getOrElse

`getOrElse(other: T): T`

Returns the option's value if it exists, `other` if it does not.

Example:
```javascript
let n = new None();
s.getOrElse('default');  // 'default'
```

### orNull

`orNull(): T`

Returns the option's value if it exists, `null` if it does not. This is functionally equivalent to saying `getOrElse(null)`.

## Why?
I love Scala almost as much as I love javascript, and I felt that the community was missing out on the functionality provided by the Scala Option API. It's simple and easy to work with, and allows for code to be written in a much more beautiful way.
