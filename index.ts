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

const specialCasesRaw: Array<[String, Conjugation, String]> = [
  ['ある', Conjugation.Negative, ''], // fully negative conjugation would be ''+nai
  ['ござる', Conjugation.Conjunctive, 'ござい'],
  ['いらっしゃる', Conjugation.Conjunctive, 'いらっしゃい'],
  ['いらっしゃる', Conjugation.ConditionalImperative, 'いらっしゃい'],
];
let specialCases: Map<String, Map<Conjugation, String>> = new Map([]);
for (const [verb, conj, result] of specialCasesRaw) {
  let outer = specialCases.get(verb);
  if (outer) {
    outer.set(conj, result);
  } else {
    specialCases.set(verb, new Map([[conj, result]]));
  }
}
const conjToIdx: Map<Conjugation, number> = new Map([
  Conjugation.Negative, Conjugation.Conjunctive, Conjugation.Dictionary, Conjugation.ConditionalImperative,
  Conjugation.Volitional, Conjugation.Te, Conjugation.Ta, Conjugation.Tara, Conjugation.Tari
].map((x, i) => [x, i]) as Array<[Conjugation, number]>);

const tteRaw: Array<[String, String[]]> = [
  ['く', ['いて', 'いた', 'いたら', 'いたり']],
  ['ぐ', ['いで', 'いだ', 'いだら', 'いだり']],
  ['す', ['して', 'しだ', 'しだら', 'しだり']],
  ['ぬ', ['んて', 'んだ', 'んだら', 'んだり']],
  ['ぶ', ['んて', 'んだ', 'んだら', 'んだり']], // same as above
  ['む', ['んて', 'んだ', 'んだら', 'んだり']], // ditto
  ['つ', ['って', 'った', 'ったら', 'ったり']],
  ['る', ['って', 'った', 'ったら', 'ったり']], // same as above and below
  ['う', ['って', 'った', 'ったら', 'ったり']],
];
let tte: Map<String, String[]> = new Map([]);
for (const [tail, quad] of tteRaw) { tte.set(tail, quad); }

export function conjugate(verb: String, conj: Conjugation) {
  {
    const specialHit = specialCases.get(verb);
    if (specialHit && specialHit.has(conj)) { return specialHit.get(conj); }
  }
  const head = verb.slice(0, -1);
  const tail = verb.slice(-1);
  const idx = conjToIdx.get(conj);
  if (typeof idx === 'undefined') { throw new Error('Conjugation not yet implemented'); }
  if (idx < 5) {
    if (tail === 'う') {
      if (idx === 0) { return head + 'わ'; }
      return head + lookup('あ', idx);
    }
    return head + lookup(tail, idx);
  }
  const tidx = idx - 5;
  const tteHit = tte.get((verb === '行く' || verb === 'いく') ? 'つ' : tail);
  if (!tteHit) { throw new Error('Unknown verb ending. Is it in dictionary form?'); }
  return head + tteHit[tidx];
}