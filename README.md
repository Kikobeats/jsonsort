# @kikobeats/jsonsort

![Last version](https://img.shields.io/github/tag/Kikobeats/jsonsort.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/jsonsort/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/jsonsort)
[![NPM Status](https://img.shields.io/npm/dm/@kikobeats/jsonsort.svg?style=flat-square)](https://www.npmjs.org/package/@kikobeats/jsonsort)

> Sort an object or a collection of objects based on a criteria.

## Install

```bash
$ npm install @kikobeats/jsonsort --global
```

## CLI

```bash
$ jsonsort <file>[flags]

Flags
  --criteria  Specify the criteria to sort. It can be a key name or fat arrow function.
  --quiet     Avoid print output
  --save      Write the output back. If a path is specified, it will be used over the original

Examples
  $ jsonsort file.json # Just output a sorted json
  $ jsonsort file.json --criteria name # Sort an array of objects based on alphabetical `name` value.
  $ jsonsort file.json --criteria 'x => x.featured' # Passing a function as criteria.
  $ jsonsort file.json --criteria name --save # Sort and save the result.
  $ jsonsort file.json --criteria name --save # Sort, save but dont print result.

```

## License

**jsonsort** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/jsonsort/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/jsonsort/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
