import {lookup} from './hiragana';

export enum Conjugation {
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

const specialCasesRaw: Array<[string, Conjugation, string]> = [
  ['ある', Conjugation.Negative, ''], // fully negative conjugation would be ''+nai
  ['ござる', Conjugation.Conjunctive, 'ござい'],
  ['いらっしゃる', Conjugation.Conjunctive, 'いらっしゃい'],
  ['いらっしゃる', Conjugation.Conditional, 'いらっしゃい'],
  ['いらっしゃる', Conjugation.Imperative, 'いらっしゃい'],
];
let specialCases: Map<string, Map<Conjugation, string>> = new Map([]);
for (const [verb, conj, result] of specialCasesRaw) {
  let outer = specialCases.get(verb);
  if (outer) {
    outer.set(conj, result);
  } else {
    specialCases.set(verb, new Map([[conj, result]]));
  }
}
const conjToIdx: Map<Conjugation, number> = new Map([
  Conjugation.Negative, Conjugation.Conjunctive, Conjugation.Dictionary, Conjugation.Conditional,
  Conjugation.Volitional, Conjugation.Te, Conjugation.Ta, Conjugation.Tara, Conjugation.Tari
].map((x, i) => [x, i]) as Array<[Conjugation, number]>);

const tteRaw: Array<[string, string[]]> = [
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
let tte: Map<string, string[]> = new Map([]);
for (const [tail, quad] of tteRaw) { tte.set(tail, quad); }

export function conjugateTypeI(verb: string, conj: Conjugation): string {
  {
    if (verb === 'する') {
      return conjugateSuru(verb, conj);
    } else if (verb === 'くる' || verb === '来る') {
      return conjugateKuru(verb, conj);
    }
    const specialHit = specialCases.get(verb);
    if (specialHit && specialHit.has(conj)) { return specialHit.get(conj) || ''; }
    // The above inner-most `get` is guaranteed to be not-undefined, so the empty string will never be returned, but
    // TypeScript 3.0.1 doesn't treat `Map.has` as a type guard 😣.
  }
  const head = verb.slice(0, -1);
  const tail = verb.slice(-1);
  const idx = conjToIdx.get(conj === Conjugation.Imperative ? Conjugation.Conditional : conj);
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

export function conjugateTypeII(verb: string, conj: Conjugation): string {
  if (verb === 'する') {
    return conjugateSuru(verb, conj);
  } else if (verb === 'くる' || verb === '来る') {
    return conjugateKuru(verb, conj);
  }
  const head = verb.slice(0, -1);
  switch (conj) {
  case Conjugation.Negative: return head;
  case Conjugation.Conjunctive: return head;
  case Conjugation.Dictionary: return verb;
  case Conjugation.Conditional: return head + 'れ';
  case Conjugation.Imperative: return head + 'ろ'; // よ also legitimate here.
  case Conjugation.Volitional: return head + 'よう';
  case Conjugation.Te: return head + 'て';
  case Conjugation.Ta: return head + 'た';
  case Conjugation.Tara: return head + 'たら';
  case Conjugation.Tari: return head + 'たり';
  default: throw new Error('Unhandled conjugation');
  }
}

function conjugateKuru(verb: string, conj: Conjugation) {
  let ret = '';
  switch (conj) {
  case Conjugation.Negative: ret = 'こ'; break;
  case Conjugation.Conjunctive: ret = 'き'; break;
  case Conjugation.Dictionary: ret = 'くる'; break;
  case Conjugation.Conditional: ret = 'これ'; break;
  case Conjugation.Imperative: ret = 'こい'; break;
  case Conjugation.Volitional: ret = 'こよう'; break;
  case Conjugation.Te: ret = 'きて'; break;
  case Conjugation.Ta: ret = 'きた'; break;
  case Conjugation.Tara: ret = 'きたら'; break;
  case Conjugation.Tari: ret = 'きたり'; break;
  default: throw new Error('Unhandled conjugation');
  }
  const head = verb.slice(0, -1);
  if (head === 'く') {
    return ret;
  } else if (head === '来') {
    return '来' + ret.slice(1);
  }
  throw new Error('Expected input to be 来る or くる');
}

function conjugateSuru(verb: string, conj: Conjugation) {
  switch (conj) {
  case Conjugation.Negative: return 'し';
  case Conjugation.Conjunctive: return 'し';
  case Conjugation.Dictionary: return 'する';
  case Conjugation.Conditional: return 'すれ';
  case Conjugation.Imperative: return 'せよ'; // しろ ok too
  case Conjugation.Volitional: return 'しよう';
  case Conjugation.Te: return 'して';
  case Conjugation.Ta: return 'した';
  case Conjugation.Tara: return 'したら';
  case Conjugation.Tari: return 'したり';
  default: throw new Error('Unhandled conjugation');
  }
}

export function typeIToPotential(verb: string): string { return conjugateTypeI(verb, Conjugation.Conditional) + 'る'; }

export enum Auxiliary {
  Potential,
  Masu,
  Nai,
  Tai,
  Tagaru,
  Hoshii,
  Rashii,
  Souda,
  SeruSaseru,
  ReruRareu
}

export function conjugate(verb: string, conj: Conjugation, typeII: boolean = false): string {
  return ((verb.slice(-1) === 'る' && typeII) ? conjugateTypeII : conjugateTypeI)(verb, conj);
}

export function conjugateAuxiliary(verb: string, aux: Auxiliary, conj: Conjugation, typeII: boolean = false): string {
  if (aux === Auxiliary.Masu) {
    const base = conjugate(verb, Conjugation.Conjunctive, typeII);
    switch (conj) {
    case Conjugation.Negative: return base + 'ません';
    // case Conjugation.Conjunctive:
    case Conjugation.Dictionary: return base + 'ます';
    case Conjugation.Conditional: return base + 'ますれば';
    case Conjugation.Imperative: return base + 'ませ';
    case Conjugation.Volitional: return base + 'ましょう';
    case Conjugation.Te: return base + 'まして';
    case Conjugation.Ta: return base + 'ました';
    case Conjugation.Tara: return base + 'ましたら';
    // case Conjugation.Tari:
    default: throw new Error('Unhandled conjugation');
    }
  } else if (aux === Auxiliary.Nai) {
    const base = conjugate(verb, Conjugation.Negative, typeII);
    switch (conj) {
    case Conjugation.Negative: return base + 'なくはない';
    case Conjugation.Conjunctive: return base + 'なく';
    case Conjugation.Dictionary: return base + 'ない';
    case Conjugation.Conditional: return base + 'なければ';
    // case Conjugation.Imperative: return base + 'ませ';
    // case Conjugation.Volitional: return base +'ましょう';
    case Conjugation.Te: return base + 'なくて';
    case Conjugation.Ta: return base + 'なかった';
    case Conjugation.Tara: return base + 'なかったら';
    // case Conjugation.Tari:
    default: throw new Error('Unhandled conjugation');
    }
  } else if (aux === Auxiliary.Tai) {
    const base = conjugate(verb, Conjugation.Conjunctive, typeII);
    switch (conj) {
    case Conjugation.Negative: return base + 'たくない';
    case Conjugation.Conjunctive: return base + 'たく';
    case Conjugation.Dictionary: return base + 'たい';
    case Conjugation.Conditional: return base + 'たければ';
    // case Conjugation.Imperative: return base + 'ませ';
    // case Conjugation.Volitional: return base +'ましょう';
    case Conjugation.Te: return base + 'たくて';
    case Conjugation.Ta: return base + 'たかった';
    case Conjugation.Tara: return base + 'たかったら';
    // case Conjugation.Tari:
    default: throw new Error('Unhandled conjugation');
    }
  } else if (aux === Auxiliary.Tagaru) {
    switch (conj) {
    case Conjugation.Conditional:
    case Conjugation.Imperative:
    case Conjugation.Volitional:
    case Conjugation.Tari: throw new Error('Unhandled conjugation');
    }
    const base = conjugate(verb, Conjugation.Conjunctive, typeII);
    const tagaruConj = conjugateTypeI('たがる', conj);
    return base + tagaruConj;
  } else {
    throw new Error('Unhandled auxiliary');
  }
}