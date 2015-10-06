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
    match<U>(matcher: {
        some: (val: T) => U;
        none: () => U;
    }): U;
}
export declare class Some<T> implements Option<T> {
    value: T;
    constructor(val: T);
    get(): T;
    isEmpty(): Boolean;
    isDefined(): Boolean;
    contains(value: T): Boolean;
    exists(predicate: (value: T) => Boolean): Boolean;
    filter(predicate: (value: T) => Boolean): Option<T>;
    flatMap<U>(transformer: (value: T) => Option<U>): Option<U>;
    map<U>(transformer: (value: T) => U): Option<U>;
    flatten<U, V>(): Option<T | V>;
    getOrElse(other: T): T;
    orNull(): T;
    match<U>(matcher: {
        some: ((val: T) => U);
        none: (() => U);
    }): U;
}
export declare class None<T> implements Option<T> {
    get<T>(): T;
    isEmpty(): Boolean;
    isDefined(): Boolean;
    contains(value: T): Boolean;
    exists(predicate: (value: T) => Boolean): Boolean;
    filter(predicate: (value: T) => Boolean): Option<T>;
    flatMap<U>(transformer: (value: T) => Option<U>): Option<U>;
    flatten<U>(): Option<U>;
    map<U>(transformer: (value: T) => U): Option<U>;
    getOrElse(other: T): T;
    orNull(): T;
    match<U>(matcher: {
        some: ((val: T) => U);
        none: (() => U);
    }): U;
}
