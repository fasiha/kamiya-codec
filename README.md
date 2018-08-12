# kamiya-codec

![Taeko Kamiya's "The Handbook of Japanese Verbs" cover](kamiya-verbs-cover.jpg)

A JavaScript/TypeScript library to conjugate Japanese verbs and auxiliary verbs based on Taeko Kamiya's *The Handbook of Japanese Verbs* (Kodansha, 2001). The idea is, you have a verb—書く, say (to write)—and maybe an auxiliary like たい (wanting to do something), and finally a conjugation, like *negative*. Then,
```js
var codec = require('kamiya-codec');
conjugateAuxiliary('書く', Auxiliary.Tai, Conjugation.Negative)
// [ '書きたくない' ]
```
gives us what we want: 書きたくない, or, “doesn’t want to write”.

This library will make most sense if you have the book for reference. It currently implements part I of the book (up to page 47).

## Install

Node.js developers: `npm install --save kamiya-codec` will add this package to your current project.

For everyone else who just want to poke around:

1. Install [Git](https://git-scm.com/).
1. Install [Node.js](https://nodejs.org/).
1. In your terminal, run the following
```
$ git clone https://github.com/fasiha/kamiya-codec.git
$ cd kamiya-codec
$ npm install
$ npm run build
```
where, in the above, each line is one command, and the `$` represents your terminal's prompt (not to be typed in: the first letters you type should be "git…"). This makes a copy of this repository on your computer (`git …`), changes into the new directory (`cd …`), installs a few JavaScript dependencies (`npm install`; `npm` is the Node.js package manager that was installed when you installed Node.js), and finally builds the TypeScript source code to Node.js-ready JavaScript (`npm run…`).

Then you can start a new Node.js shell (run `node` in the terminal) or create a new JavaScript or TypeScript program to exercise this library:
```js
var codec = require('./index');
conjugateAuxiliary('書く', Auxiliary.Tai, Conjugation.Negative)
// [ '書きたくない' ]
```

## Usage

### `conjugate(verb: string, conj: Conjugation, typeII: boolean = false): string[]`

Conjugates a `verb` in dictionary form with a given conjugation (see below for list of allowed values). Returns an array of strings (guaranteed to be at least one element long, which is the most common case).

This library doesn't yet have a good way to tell type II (<ruby>五段<rt>godan</rt></ruby>) verbs from type I (<ruby>一段<rt>ichidan</rt></ruby>) ones, so all functions including `conjugate` accept a `typeII` boolean to let you specify that the incoming verb is or isn't type II. (I'm not very fond of opaque names like type I and type II but to maximally take advantage of Taeko Kamiya's book, we use her notation.)

### `conjugateAuxiliary(verb: string, aux: Auxiliary, conj: Conjugation, typeII: boolean = false): string[]`

Given a `verb` as well as an `aux`iliary verb (see below for list of allowed values), plus the `conj`ugation and the optional `typeII` boolean, apply the auxiliary to the verb and conjugate the result.

### enum Conjugation
Conjugations must be one of the following:
```
{
  Negative,
  Conjunctive,
  Dictionary,
  Conditional,
  Imperative,
  Volitional,
  Te,
  Ta,
  Tara,
  Tari
}
```

### enum Auxiliary 
Auxiliaries must be one of the following:
```
{
  Potential,
  Masu,
  Nai,
  Tai,
  Tagaru,
  Hoshii,
  Rashii,
  SoudaHearsay,
  SoudaConjecture,
  SeruSaseru,
  ShortenedCausative,
  ReruRareu,
  CausativePassive,
  ShortenedCausativePassive
}
```

## Development
Run tests with `npm test`. We use [`tape`](https://github.com/substack/tape) and all exported functions have tests in the [`tests/`](./tests) directory. Tests currently happen to all be in JavaScript.
