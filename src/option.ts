///<reference path="../typings/lodash/lodash.d.ts"/>

import * as _ from 'lodash';

export interface Option<T> {
    get(): T;
    isEmpty(): Boolean;
    isDefined(): Boolean;
    contains(value: T): Boolean;
    exists(predicate: (value: T) => Boolean): Boolean;
    filter(predicate: (value: T) => Boolean): Option<T>;
    flatMap<U>(transformer: (value: T) => Option<U>): Option<U>;
    map<U>(transformer: (value: T) => U): Option<U>;
    flatten<U>(): Option<U>;
    getOrElse(other: T): T;
    orNull(): T;

    match<U>(matcher: { some: (val: T) => U, none: () => U }): U;
}

export class Some<T> implements Option<T> {
    value: T;

    constructor(val: T) {
        this.value = val;
    }

    get(): T {
        return this.value;
    }

    isEmpty(): Boolean {
        return false;
    }

    isDefined(): Boolean {
        return true;
    }

    contains(value: T): Boolean {
        return _.isEqual(this.value, value);
    }

    exists(predicate: (value: T) => Boolean): Boolean {
        return predicate(this.value);
    }

    filter(predicate: (value: T) => Boolean): Option<T> {
        if (predicate(this.value)) {
            return this;
        }
        else {
            return new None<T>();
        }
    }

    flatMap<U>(transformer: (value: T) => Option<U>): Option<U> {
        return transformer(this.value);
    }

    map<U>(transformer: (value: T) => U): Option<U> {
        return new Some(transformer(this.value));
    }

    flatten<U, V>(): Option<T | V> {
        if (!!this.value['flatten']) {
            let innerOpt = <Option<U>> <any> this.value;
            return <Option<V>> innerOpt.flatten();
        }
        else {
            return new Some(this.value);
        }
    }

    getOrElse(other: T): T {
        return this.value;
    }

    orNull(): T {
        return this.value;
    }

    match<U>(matcher: { some: ((val: T) => U), none: (() => U) }): U {
        return matcher.some(this.value);
    }
}

export class None<T> implements Option<T> {
    get<T>(): T {
        return undefined;
    }

    isEmpty(): Boolean {
        return true;
    }

    isDefined(): Boolean {
        return false;
    }

    contains(value: T): Boolean {
        return false;
    }

    exists(predicate: (value: T) => Boolean): Boolean {
        return false;
    }

    filter(predicate: (value: T) => Boolean): Option<T> {
        return new None<T>();
    }

    flatMap<U>(transformer: (value: T) => Option<U>): Option<U> {
        return new None<U>();
    }

    flatten<U>(): Option<U> {
        return new None<U>();
    }

    map<U>(transformer: (value: T) => U): Option<U> {
        return new None<U>();
    }

    getOrElse(other: T): T {
        return other;
    }

    orNull(): T {
        return null;
    }

    match<U>(matcher: { some: ((val: T) => U), none: (() => U) }): U {
        return matcher.none();
    }
}
