export enum Conjugation {
  Present,
  Prenomial,
  Negative,
  Past,
  NegativePast,
  ConjunctiveTe,
  Adverbial,
  Conditional,
  TaraConditional,
  Tari,
  Noun,
}

function never(x: never) { throw new Error('never?'); }

export function conjugate(adjective: string, conj: Conjugation, iAdjective: boolean): string[] {
  if (iAdjective) {
    let stem = adjective.slice(0, 1);
    if (adjective === 'いい' || adjective === '良い' || adjective === 'よい') {
      stem = adjective.startsWith('良') ? '良' : 'よ';
    }
    switch (conj) {
    case Conjugation.Present: return [adjective];
    case Conjugation.Prenomial: return [adjective];
    case Conjugation.Negative: return [stem + 'くない'];
    case Conjugation.Past: return [stem + 'くなかった'];
    case Conjugation.NegativePast: return [stem + 'かった'];
    case Conjugation.ConjunctiveTe: return [stem + 'く', stem + 'くて'];
    case Conjugation.Adverbial: return [stem + 'く'];
    case Conjugation.Conditional: return [stem + 'ければ'];
    case Conjugation.TaraConditional: return [stem + 'かったら'];
    case Conjugation.Tari: return [stem + 'かったり'];
    case Conjugation.Noun: return [stem + 'さ'];
    default: never(conj);
    }
  }
  // na-adjective
  switch (conj) {
  case Conjugation.Present: return [adjective + 'な'];
  case Conjugation.Prenomial: return ['だ', 'です', 'でございます'].map(suffix => adjective + suffix);
  case Conjugation.Negative:
    return ['ではない', 'でない', 'じゃない', 'ではありません'].map(suffix => adjective + suffix);
  case Conjugation.Past: return ['だった', 'でした'].map(suffix => adjective + suffix);
  case Conjugation.NegativePast:
    return ['ではなかった', 'でなかった', 'じゃなかった', 'ではありませんでした'].map(suffix => adjective + suffix);
  case Conjugation.ConjunctiveTe: return ['で'].map(suffix => adjective + suffix);
  case Conjugation.Adverbial: return ['に'].map(suffix => adjective + suffix);
  case Conjugation.Conditional: return ['なら', 'ならば'].map(suffix => adjective + suffix);
  case Conjugation.TaraConditional: return ['だったら'].map(suffix => adjective + suffix);
  case Conjugation.Tari: return ['だったり', 'でしたり'].map(suffix => adjective + suffix);
  case Conjugation.Noun: return ['さ'].map(suffix => adjective + suffix);
  default: never(conj);
  }

  throw new Error('unknown conjugation/iAdjective');
}