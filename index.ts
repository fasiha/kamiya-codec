import {lookup} from './hiragana';

export enum Conjugation {
  Negative,
  Conjunctive,
  Dictionary,
  ConditionalImperative,
  Volitional,
  Te,
  Ta,
  Tara,
  Tari
}

const specialCases: Array<[String, Conjugation, String]> = [
  ['ある', Conjugation.Negative, ''], // fully negative conjugation would be ''+nai
  ['ござる', Conjugation.Conjunctive, 'ござい'],
  ['いらっしゃる', Conjugation.Conjunctive, 'いらっしゃい'],
  ['いらっしゃる', Conjugation.ConditionalImperative, 'いらっしゃい'],
];
const conjToIdx: Map<Conjugation, number> = new Map([
  Conjugation.Negative,
  Conjugation.Conjunctive,
  Conjugation.Dictionary,
  Conjugation.ConditionalImperative,
  Conjugation.Volitional,
].map((x, i) => [x, i]) as Array<[Conjugation, number]>);

export function conjugate(verb: String, conj: Conjugation) {
  for (const [specialVerb, specialConj, result] of specialCases) {
    if (verb === specialVerb && conj === specialConj) { return result; }
  }
  const head = verb.slice(0, -1);
  const tail = verb.slice(-1);
  const idx = conjToIdx.get(conj);
  if (typeof idx === 'undefined') { throw new Error('Conjugation not yet implemented'); }
  if (tail === 'う') {
    if (idx === 0) { return head + 'わ'; }
    return head + lookup('あ', idx);
  }
  return head + lookup(tail, idx);
}