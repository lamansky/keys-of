'use strict'

const assert = require('assert')
const isArrayWith = require('is-array-with')
const keysOf = require('.')

describe('keysOf()', function () {
  it('should return the Map key of a single value', function () {
    assert(isArrayWith(keysOf(new Map([['key', 'value']]), 'value'), 'key'))
  })

  it('should return the Object key of a single value', function () {
    assert(isArrayWith(keysOf({key: 'value'}, 'value'), 'key'))
  })

  it('should return the Map keys of a single value', function () {
    assert(isArrayWith(keysOf(new Map([['key1', 'value'], ['key2', 'value']]), 'value'), 'key1', 'key2'))
  })

  it('should return an empty array for a non-existent value', function () {
    assert(isArrayWith(keysOf(new Map([['key', 'value']]), 'other')))
  })

  it('should treat an array as a single value', function () {
    const value = ['value']
    assert(isArrayWith(keysOf(new Map([['key', value]]), value), 'key'))
  })

  it('should return the Map key of an equivalent value when `loose` is true', function () {
    assert(isArrayWith(keysOf(new Map([['key', {value: true}]]), {value: true})))
    assert(isArrayWith(keysOf(new Map([['key', {value: true}]]), {}, {loose: true})))
    assert(isArrayWith(keysOf(new Map([['key', {value: true}]]), {value: true}, {loose: true}), 'key'))
  })

  it('should support the bind operator', function () {
    assert(isArrayWith(keysOf.call(new Map([['key', 'value']]), 'value'), 'key'))
  })

  describe('#any()', function () {
    it('should return the Map keys of multiple values', function () {
      const map = new Map([['a', 1], ['b', 2]])
      assert(isArrayWith(keysOf.any(map, [1, 2]), 'a', 'b'))
    })

    it('should return a key only once if a value is duplicated', function () {
      const map = new Map([['a', 1], ['b', 2]])
      assert(isArrayWith(keysOf.any(map, [1, 1]), 'a'))
    })
  })
})
