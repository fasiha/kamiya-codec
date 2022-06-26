"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjDeconjugate = exports.adjConjugate = exports.adjConjugations = void 0;
exports.adjConjugations = [
    'Present', 'Prenomial', 'Negative', 'Past', 'NegativePast', 'ConjunctiveTe', 'Adverbial', 'Conditional',
    'TaraConditional', 'Tari', 'Noun'
];
function never(x) { throw new Error('never?'); }
function adjConjugate(adjective, conj, iAdjective) {
    if (iAdjective) {
        let stem = adjective.slice(0, -1);
        if (adjective === 'いい' || adjective === '良い' || adjective === 'よい') {
            stem = adjective.startsWith('良') ? '良' : 'よ';
        }
        switch (conj) {
            case 'Present': return [adjective];
            case 'Prenomial': return [adjective];
            case 'Negative': return [stem + 'くない'];
            case 'Past': return [stem + 'かった'];
            case 'NegativePast': return [stem + 'くなかった'];
            case 'ConjunctiveTe': return [stem + 'く', stem + 'くて'];
            case 'Adverbial': return [stem + 'く'];
            case 'Conditional': return [stem + 'ければ'];
            case 'TaraConditional': return [stem + 'かったら'];
            case 'Tari': return [stem + 'かったり'];
            case 'Noun': return [stem + 'さ'];
            default: never(conj);
        }
    }
    // na-adjective
    switch (conj) {
        case 'Prenomial': return [adjective + 'な'];
        case 'Present': return ['だ', 'です', 'でございます'].map(suffix => adjective + suffix);
        case 'Negative': return ['ではない', 'でない', 'じゃない', 'ではありません'].map(suffix => adjective + suffix);
        case 'Past': return ['だった', 'でした'].map(suffix => adjective + suffix);
        case 'NegativePast':
            return ['ではなかった', 'でなかった', 'じゃなかった', 'ではありませんでした'].map(suffix => adjective + suffix);
        case 'ConjunctiveTe': return [adjective + 'で'];
        case 'Adverbial': return [adjective + 'に'];
        case 'Conditional': return ['なら', 'ならば'].map(suffix => adjective + suffix);
        case 'TaraConditional': return ['だったら'].map(suffix => adjective + suffix);
        case 'Tari': return ['だったり', 'でしたり'].map(suffix => adjective + suffix);
        case 'Noun': return [adjective + 'さ'];
        default: never(conj);
    }
    throw new Error('unknown conjugation/iAdjective');
}
exports.adjConjugate = adjConjugate;
function adjDeconjugate(conjugated, dictionary, iAdjective) {
    const hits = [];
    for (const conj of exports.adjConjugations) {
        const result = adjConjugate(dictionary, conj, iAdjective);
        if (result.includes(conjugated)) {
            hits.push({ conjugation: conj, result });
        }
    }
    return hits;
}
exports.adjDeconjugate = adjDeconjugate;
