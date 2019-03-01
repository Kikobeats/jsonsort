#!/usr/bin/env node
'use strict'

const { compile } = require('es6-arrow-function')
const beautyError = require('beauty-error')
const jsonFuture = require('json-future')
const sortKeys = require('sort-keys')
const sortOn = require('sort-on')

const path = require('path')

const pkg = require('../package.json')

require('update-notifier')({ pkg }).notify()

const cli = require('meow')({
  pkg,
  help: require('fs').readFileSync(path.join(__dirname, 'help.txt'), 'utf8'),
  flags: {
    cwd: {
      default: process.cwd()
    }
  }
})

const compileCriteria = code => eval(compile(code).code) // eslint-disable-line no-eval

const getCriteria = criteria => {
  if (typeof criteria === 'string') return item => item[criteria]
  if (criteria.split(' ').length <= 1) return criteria
  if (!criteria.includes('=>')) {
    throw { message: '`criteria` as function need to be an arrow function.' } // eslint-disable-line no-throw-literal
  }
  return compileCriteria(criteria)
}

const main = async () => {
  const [file] = cli.input
  if (!file) cli.showHelp()

  const { save, criteria, quiet } = cli.flags
  let json = jsonFuture.load(file)
  const fn = getCriteria(criteria)

  let sortedJson = Array.isArray(json) ? sortOn(json, fn) : sortKeys(json, { compare: fn })

  if (save) jsonFuture.save(save !== true ? save : file, sortedJson)
  if (!quiet) console.log(sortedJson)
}

main()
  .then(() => {
    process.exit()
  })
  .catch(err => {
    console.log(`\n ${beautyError(err)}`)
    process.exit(1)
  })
