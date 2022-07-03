# kamiya-codec

Table of contents—
- [kamiya-codec](#kamiya-codec)
  - [Install](#install)
  - [Usage for verbs](#usage-for-verbs)
    - [`conjugate(verb: string, conj: Conjugation, typeII: boolean = false): string[]`](#conjugateverb-string-conj-conjugation-typeii-boolean--false-string)
    - [`conjugateAuxiliaries(verb: string, auxs: Auxiliary[], conj: Conjugation, typeII: boolean = false): string[]`](#conjugateauxiliariesverb-string-auxs-auxiliary-conj-conjugation-typeii-boolean--false-string)
    - [`type Conjugation` and `conjugations`](#type-conjugation-and-conjugations)
    - [`type Auxiliary` and `auxiliaries`](#type-auxiliary-and-auxiliaries)
    - [`verbDeconjugate(conjugated: string, dictionaryForm: string, typeII = false, maxAuxDepth = Infinity)`](#verbdeconjugateconjugated-string-dictionaryform-string-typeii--false-maxauxdepth--infinity)
  - [Usage for adjectives](#usage-for-adjectives)
    - [`adjConjugate(adjective: string, conj: AdjConjugation, iAdjective: boolean): string[]`](#adjconjugateadjective-string-conj-adjconjugation-iadjective-boolean-string)
    - [`type AdjConjugation` and `adjConjugations`](#type-adjconjugation-and-adjconjugations)
    - [`adjDeconjugate(conjugated: string, dictionary: string, iAdjective: boolean): AdjDeconjugated[]`](#adjdeconjugateconjugated-string-dictionary-string-iadjective-boolean-adjdeconjugated)
  - [Development](#development)
  - [Changelog](#changelog)

![Taeko Kamiya's "The Handbook of Japanese Verbs" and "The Handbook of Japanese Adjectives and Adverbs"](kamiya.jpg)

A dependency-free browser/Node JavaScript/TypeScript library to conjugate Japanese
- verbs,
- auxiliary verbs, and
- adjectives

based on Taeko Kamiya's *The Handbook of Japanese Verbs* ([Kodansha](https://kodansha.us/book/the-handbook-of-japanese-verbs/)) and *The Handbook of Japanese Adjectives and Adverbs* ([Kodansha](https://kodansha.us/book/the-handbook-of-japanese-adjectives-and-adverbs/)). The idea is, you have a verb—書く, say (to write)—and maybe an auxiliary like たい (wanting to do something), and finally a conjugation, like *negative*. Then,
```js
var codec = require('kamiya-codec');
codec.conjugateAuxiliaries('書く', ['Tai'], 'Negative')
// [ '書きたくない' ]
```
gives us what we want: 書きたくない, or, “doesn’t want to write”.

Similarly, you can ask the library to attempt to reverse this conjugation:
```js
codec.verbDeconjugate('書きたくない', '書く')
// [ { conjugation: 'Negative', auxiliaries: [ 'Tai' ], result: [ '書きたくない' ] } ]
```

This library will make most sense if you have the book(s) for reference. It currently implements the first part of each book.

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
codec.conjugateAuxiliaries('書く', ['Tai'], 'Negative')
// [ '書きたくない' ]
```

## Usage for verbs

### `conjugate(verb: string, conj: Conjugation, typeII: boolean = false): string[]`

Conjugates a `verb` in dictionary form with a given conjugation (see below for list of allowed values). Returns an array of strings (guaranteed to be at least one element long, which is the most common case).

This library doesn't yet have a perfect way to tell type I (<ruby>五段<rt>godan</rt></ruby>) verbs from type II (<ruby>一段<rt>ichidan</rt></ruby>) ones, so all functions including `conjugate` accept a `typeII` boolean to let you specify that the incoming verb is or isn't type II. (I'm not very fond of opaque names like type I and type II but to maximally take advantage of Taeko Kamiya's book, we use her notation.)

### `conjugateAuxiliaries(verb: string, auxs: Auxiliary[], conj: Conjugation, typeII: boolean = false): string[]`

Given a `verb` as well as an array of auxiliary verbs (`auxs`, see below for list of allowed values), plus the final `conj`ugation and the optional `typeII` boolean (false if 五段 (default), true if 一段), apply each of the auxiliaries to the verb and conjugate the result.

### `type Conjugation` and `conjugations`
Conjugations must be one of the following:
```
| "Negative"
| "Conjunctive"
| "Dictionary"
| "Conditional"
| "Imperative"
| "Volitional"
| "Te"
| "Ta"
| "Tara"
| "Tari"
```

`conjugations` is an array containing all allowed values (for looping, etc.).

### `type Auxiliary` and `auxiliaries`
Auxiliaries must be one of the following:
```
| "Potential"
| "Masu"
| "Nai"
| "Tai"
| "Tagaru"
| "Hoshii"
| "Rashii"
| "SoudaHearsay"
| "SoudaConjecture"
| "SeruSaseru"
| "ShortenedCausative"
| "ReruRareu"
| "CausativePassive"
| "ShortenedCausativePassive"
| "Ageru"                     // Kamiya section 7.15
| "Sashiageru"
| "Yaru"
| "Morau"                     // 7.16
| "Itadaku"
| "Kureru"                    // 7.17
| "Kudasaru"
| "TeIruNoun"                 // 7.21
| "TeAruNoun"                 // 7.21
| "Miru"                      // 7.22
| "Iku"                       // 7.23
| "Kuru"                      // 7.24
| "Oku"                       // 7.25
| "Shimau"                    // 7.26

```

`auxiliaries` is an array of all allowed values.

### `verbDeconjugate(conjugated: string, dictionaryForm: string, typeII = false, maxAuxDepth = Infinity)`
Given a `conjugated` form of a verb, and its `dictionaryForm` (ending in る or one of the other うくぐ⋯) and that dictionary form's `typeII` boolean (false if 五段 (default), true if 一段), attempt to deconjugate: find the list of auxiliaries and the final conjugation that produce the first argument when put through `conjugate` or `conjugateAuxliaries` (above).

`maxAuxDepth` can meaningfully be 0 (don't check for auxiliaries), 1, 2, or 3, and for increasing values will look for more and more auxiliaries that might lead from `dictionaryForm` to the `conjugated` form.

The returned object has this type:
```ts
interface Deconjugated {
  auxiliaries: Auxiliary[];
  conjugation: Conjugation;
  result: string[];
}
```

As you might imagine, given the inputs required, I expect you to use this alongside a morphological parser like MeCab that can give you the lemma (dictionary form) and whether or not your conjugated phrase is type I or II, etc.

This is very brute-force and might fail for your input. Please open an [issue](https://github.com/fasiha/kamiya-codec/issues) with examples that don't deconjugate.

## Usage for adjectives
### `adjConjugate(adjective: string, conj: AdjConjugation, iAdjective: boolean): string[]`
Given the dictionary form of an adjective (e.g., 楽しい or 簡単—note な adjectives should _not_ be given with な added on), a conjugation (see below), and whether this is an い-adjective or not, returns an array of strings with that conjugation.

### `type AdjConjugation` and `adjConjugations`
Adjective conjugations must be one of the following:
```
| "Negative"
| "Conditional"
| "Tari"
| "Present"
| "Prenomial"
| "Past"
| "NegativePast"
| "ConjunctiveTe"
| "Adverbial"
| "TaraConditional"
| "Noun"
```

`adjConjugations` is an array of all valid values.

### `adjDeconjugate(conjugated: string, dictionary: string, iAdjective: boolean): AdjDeconjugated[]`
With
```ts
interface AdjDeconjugated {
  conjugation: AdjConjugation;
  result: string[];
}
```
this function attempts to deconjugate a string given its dictionary form and its い vs な status. Brute force. Again, the expectation is you would use this with MeCab or similar.

## Development
Run tests with `npm test`. We use [`tape`](https://github.com/substack/tape) and all exported functions have tests in the [`tests/`](./tests) directory. Tests currently happen to all be in JavaScript.

## Changelog
**3.0** replaced `conjugateAuxiliary` with the more robust `conjugateAuxiliaries` which can take an array of auxiliaries. Check it out: start with 
1. 知る
2. → causative form (`SeruSaseru`)
3. → "do something" (for me or someone, `Kureru`)
4. → polite (`Masu`)
5. → past tense (`Ta`)
6. ➜ 知らせてくれました 💪! (Example from page 164 of *Handbook of Japanese Verbs*, section 7.17, example 2.)
```
conjugateAuxiliaries('知る', ['SeruSaseru', 'Kureru', 'Masu'], 'Ta') // [ '知らせてくれました' ]
```

Consolidated deconjugator also.

**2.0** converted from enums to discriminated unions; added adjectives; added brute force deconjugators.
