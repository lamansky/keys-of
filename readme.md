# keys-of

Returns the keys/indexes at which the specified value is located in a collection.

It’s like `Array.prototype.indexOf()` except it works on Maps/Objects/etc. and returns all of the keys/indexes, not just the first one.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i keys-of
```

## API

The module exports a `keysOf()` function that has one other function attached to it as a method: `keysOf.any()`.

### `keysOf()`

#### Parameters

1. Bindable: `c` (Array, Iterator, Object, Map, Set, string, or Typed Array)
2. `valueToFind` (any): The value whose corresponding keys or indexes you want to locate.
3. Optional: Object argument:
    * `arrays` / `maps` / `sets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set` (respectively).
    * `inObj` (boolean): Whether or not to search inherited properties if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `loose` (boolean): Whether or not to identify values loosely (as defined by `looselyEquals`). Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.
    * `reflectObj` (boolean): Whether or not to use reflection to search non-enumerable Object property values. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.

#### Return Value

An array of keys or numeric indexes (depending on the collection type).

#### Example

```javascript
const keysOf = require('keys-of')

const obj = {
  a: 1,
  b: 2,
  c: 2,
  d: {},
  e: {},
}

keysOf(obj, 1) // ['a']
keysOf(obj, 2) // ['b', 'c']

keysOf(obj, {}) // []
keysOf(obj, {}, {loose: true}) // ['d', 'e']
```

### `keysOf.any()`

Use this function to find the keys that correspond to any of the given values. The signature is the same as the main function except that the second parameter is called `valuesToFind` and takes an iterable (such as an array or string).

#### Example

```javascript
const keysOf = require('keys-of')

const obj = {
  a: 1,
  b: 2,
  c: 2,
  d: {},
  e: {},
}

keysOf.any(obj, [1, 2]) // ['a', 'b', 'c']
keysOf.any(obj, [1, {}], {loose: true}) // ['a', 'd', 'e']
```

## Related

* [key-of](https://github.com/lamansky/key-of): Same as this module, except it only returns the first key or index.
