#!/usr/bin/env node
'use strict'

const { compile } = require('es6-arrow-function')
const beautyError = require('beauty-error')
const jsonFuture = require('json-future')
const sortKeys = require('sort-keys')
const getStdin = require('get-stdin')
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
  if (!criteria) return
  if (typeof criteria === 'string') return item => item[criteria]
  if (criteria.split(' ').length <= 1) return criteria
  if (!criteria.includes('=>')) {
    throw { message: '`criteria` as function need to be an arrow function.' } // eslint-disable-line no-throw-literal
  }
  return compileCriteria(criteria)
}

const getInput = async cli => {
  const [file] = cli.input
  if (file) return { file, data: await jsonFuture.load(file) }

  const input = await getStdin()
  if (input) return { data: JSON.parse(input) }

  return null
}

const main = async () => {
  const { file, data } = await getInput(cli)
  const { save, criteria, quiet } = cli.flags

  if (!data) cli.showHelp()
  const fn = getCriteria(criteria)
  const sortedData = Array.isArray(data) ? sortOn(data, fn) : sortKeys(data, { compare: fn })

  if (save && file) jsonFuture.save(save !== true ? save : file, sortedData)
  if (!quiet) console.log(JSON.stringify(sortedData, null, 2))
}

main()
  .then(() => {
    process.exit()
  })
  .catch(err => {
    console.log(`\n ${beautyError(err)}`)
    process.exit(1)
  })
