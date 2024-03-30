# kamiya-codec

Table of contents—
- [kamiya-codec](#kamiya-codec)
  - [Install](#install)
    - [Node.js](#nodejs)
    - [Browser](#browser)
    - [Playing around](#playing-around)
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
    - [version 4.11.0](#version-4110)
    - [version 4.10.0](#version-4100)
    - [version 4.9.2](#version-492)
    - [version 4.9.1](#version-491)
    - [version 4.9](#version-49)
    - [version 4.8](#version-48)
    - [version 4.7](#version-47)
    - [version 4.6](#version-46)
    - [version 4.5](#version-45)
    - [version 4.4](#version-44)
    - [version 4.3](#version-43)
    - [version 4.2](#version-42)
    - [version 4.1](#version-41)
    - [version 4.0](#version-40)
    - [version 3.1](#version-31)
    - [version 3.0](#version-30)
    - [version 2.0](#version-20)

![Taeko Kamiya's "The Handbook of Japanese Verbs" and "The Handbook of Japanese Adjectives and Adverbs"](kamiya.jpg)

A dependency-free browser/Node JavaScript/TypeScript library to conjugate and deconjugate Japanese
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

### Node.js
Node.js developers: `npm install --save kamiya-codec` will add this package to your current project.

Depending on what module system you use, you can either `require` (CommonJS):
```js
var codec = require("kamiya-codec");
console.log(codec.conjugateAuxiliaries("書く", ["Tai"], "Negative"));
```
or you can `import` (ESM, i.e., EcmaScript Modules), which will work for TypeScript:
```js
import codec from "kamiya-codec";
console.log(codec.conjugateAuxiliaries("書く", ["Tai"], "Negative"));
```

### Browser
Similarly for the browser you have two choices: ESM (EcmaScript modules) or a globally-defined variable.

If you use ESM (widely supported by modern browsers), drop
- [`kamiya.min.mjs`](./dist/kamiya.min.mjs) and
- [`kamiya.min.mjs.map`](./dist/kamiya.min.mjs.map)

somewhere your HTML can see and then
```html
<script type="module">
  import * as codec from "./kamiya.min.mjs";
  console.log(codec.conjugateAuxiliaries("書く", ["Tai"], "Negative"));
</script>
```

Alternatively, if you want just a plain JavaScript file defining a global variable, then put
- [`kamiya.min.js`](./dist/kamiya.min.js) and
- [`kamiya.min.js.map`](./dist/kamiya.min.js.map)

(so with `.js` instead of `.mjs`) somewhere your HTML can see, then
```html
<script src="kamiya.min.js"></script>
<script>
  console.log(kamiya.conjugateAuxiliaries("書く", ["Tai"], "Negative"));
</script>
```
The first `<script>` will load this library under the `kamiya` global varible name.

### Playing around
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

Irregular verbs
- する
- 来る・くる

are handled specially and ignore `typeII`.

### `conjugateAuxiliaries(verb: string, auxs: Auxiliary[], conj: Conjugation, typeII: boolean = false): string[]`

Given a `verb` as well as an array of auxiliary verbs (`auxs`, see below for list of allowed values), plus the final `conj`ugation and the optional `typeII` boolean (false if 五段 (default), true if 一段), apply each of the auxiliaries to the verb and conjugate the result.

Note that the following two calls are equivalent:
```ts
conjugate(verb, conj, typeII)
// deepEquals
conjugateAuxiliaries(verb, [], conj, typeII)
```

As above, する and 来る・くる irregular verbs will be conjugated correctly and will ignore `typeII`.

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
| "Zu"
```

`conjugations` is an array containing all allowed values (for looping, etc.).

> Note that `Zu` (the traditional variant of `Negative`) is not included in Kamiya's book but I have included it here. (I have *not* yet added the ぬ-form of ず.)

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
| "ReruRareru"
| "CausativePassive"
| "ShortenedCausativePassive"
| "Ageru"                     // Kamiya section 7.15
| "Sashiageru"
| "Yaru"
| "Morau"                     // 7.16
| "Itadaku"
| "Kureru"                    // 7.17
| "Kudasaru"
| "TeIru"                     // 7.5 - 7.6
| "TeAru"                     // 7.7
| "Miru"                      // 7.22
| "Iku"                       // 7.23
| "Kuru"                      // 7.24
| "Oku"                       // 7.25
| "Shimau"                    // 7.26
| "TeOru"                     // Not in Kamiya
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
| "StemSou" .       // Section 4.5
| "StemNegativeSou" // Section 4.5
```

`adjConjugations` is an array of all valid values.

**`StemSou`** and **`StemNegativeSou`** are from §4.5 "Adj stem + sō da" of *Handbook of Japanese Adjectives and Adverbs*, and mean "look" or "look like". They are separated into positive vs negative forms because they are quite irregular and both yield な-adjectives.

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
### version 4.11.0
Allow deconjugator to work with "かいていただけません", i.e., Itadaku + Potential + Masu (and finally Negative).

### version 4.10.0
Allow deconjugator to work with "してもらいたい", i.e., Morau + Tai auxiliaries. We might need to think of a more long-term solution than the bandaid I used but for now, this is a quick tactical fix.

### version 4.9.2
This is only a housekeeping update for nerds: using esbuild to export IIFE and ESM things for others to use. Hopefully this breaks nothing.

### version 4.9.1
Ugh I had a typo all this time: instead of `ReruRareru` I was missing an `r`. I know this is a breaking change but I cannot even.

### version 4.9
The `Oku` auxiliary's ～ておく can be colloquially shortened to ～とく per [mattb](https://japanese.stackexchange.com/q/18157) on Japanese Stack Exchange.

### version 4.8
Allow だ + Nai + Te = じゃなくて.

### version 4.7
Added `StemSou` and `StemNegativeSou` conjugations to adjectives.

### version 4.6
Added `Zu` conjugation (old form of `Negative`).

### version 4.5
Added polite です endings to `SoudaConjecture`, so we can do 読む + Potential + SoudaConjecture (polite) + Ta (past tense) = 読めそうでした. (I haven't added it to `SoudaHearsay`, I haven't encountered that yet.)

### version 4.4
Add a few contractions of the `Shimau` auxiliary, ～てしまう:
- ～ちゃう (chau)
- ～ちまう (chimau; or ～じまう and ～ぢまう (jimau/dimau) with rendaku when て becomes で)

See [SLJ FAQ](https://www.sljfaq.org/afaq/colloquial-contractions.html) on this topic.

### version 4.3
Add the てる contraction of ている

### version 4.2
Kamiya only mentions one form of ない's て-form: on page 37, e.g., (買わ)なくて. But we also encounter (買わ)ないで, see, e.g., this from [JapanesePod101](https://www.japanesepod101.com/forum/viewtopic.php?t=7095):

> Nakute indicates “cause and effect”. Naide means “without”.

This version adds this second nai+te form.

### version 4.1
This isn't in Kamiya's verbs book, but I added `TeOru`, 居る, a kenjougo (humble) synonym for いる.

### version 4.0
Renames
- `TeAruNoun` → `TeAru`
- `TeIruNoun` → `TeIru`

and deconjugates these as well.

### version 3.1
Adds the sparse support for copulas だ and です: pages 34-35 of *Verbs*.

### version 3.0
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

### version 2.0
**2.0** converted from enums to discriminated unions; added adjectives; added brute force deconjugators.
