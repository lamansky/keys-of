'use strict'

const concatEach = require('concat-each')
const entries = require('entries-iterator')
const equals = require('equals')
const iterify = require('iterify')
const kget = require('kget')
const pfn = require('pfn')
const xfn = require('xfn')

module.exports = xfn(
  {pluralArg: 1, pluralProp: 'any'},
  (c, valuesToFind, {compareAs, compareBy, compareByOptions, loose, looselyEquals = equals, ...o} = {}) => {
    compareAs = typeof compareBy === 'undefined' ? pfn(compareAs) : pfn(compareAs, x => kget(x, compareBy, compareByOptions))
    return concatEach([], entries(c, o), iterify(valuesToFind), ([k, v], x) => {
      v = compareAs(v)
      return (v === x || (loose && looselyEquals(v, x))) ? [k] : []
    }, {unique: true})
  }
)
