'use strict'

const ce = require('concat-each')
const e = require('entries-iterator')
const equals = require('equals')
const iterify = require('iterify')
const xfn = require('xfn')

module.exports = xfn(
  {pluralArg: 1, pluralProp: 'any'},
  (c, valuesToFind, {loose, looselyEquals: eq = equals, ...o} = {}) =>
    ce([], e(c, o), iterify(valuesToFind), ([k, v], x) => (v === x || (loose && eq(v, x))) ? [k] : [], {unique: true})
)
