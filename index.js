"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deconjugateAuxiliary = exports.deconjugate = exports.conjugateAuxiliary = exports.conjugate = exports.conjugateTypeII = exports.conjugateTypeI = exports.auxiliaries = exports.conjugations = void 0;
const hiragana_1 = require("./hiragana");
exports.conjugations = ['Negative', 'Conjunctive', 'Dictionary', 'Conditional', 'Imperative', 'Volitional', 'Te', 'Ta', 'Tara', 'Tari'];
exports.auxiliaries = [
    'Potential', 'Masu', 'Nai', 'Tai', 'Tagaru', 'Hoshii', 'Rashii', 'SoudaHearsay', 'SoudaConjecture', 'SeruSaseru',
    'ShortenedCausative', 'ReruRareu', 'CausativePassive', 'ShortenedCausativePassive'
];
const specialCasesRaw = [
    ['ある', 'Negative', ''],
    ['ござる', 'Conjunctive', 'ござい'],
    ['いらっしゃる', 'Conjunctive', 'いらっしゃい'],
    ['いらっしゃる', 'Conditional', 'いらっしゃい'],
    ['いらっしゃる', 'Imperative', 'いらっしゃい'],
];
let specialCases = new Map([]);
for (const [verb, conj, result] of specialCasesRaw) {
    let outer = specialCases.get(verb);
    if (outer) {
        outer.set(conj, result);
    }
    else {
        specialCases.set(verb, new Map([[conj, result]]));
    }
}
const conjToIdx = new Map(exports.conjugations.filter(x => x !== 'Imperative').map((x, i) => [x, i]));
const tteRaw = [
    ['く', ['いて', 'いた', 'いたら', 'いたり']],
    ['ぐ', ['いで', 'いだ', 'いだら', 'いだり']],
    ['す', ['して', 'した', 'したら', 'したり']],
    ['ぬ', ['んて', 'んだ', 'んだら', 'んだり']],
    ['ぶ', ['んて', 'んだ', 'んだら', 'んだり']],
    ['む', ['んて', 'んだ', 'んだら', 'んだり']],
    ['つ', ['って', 'った', 'ったら', 'ったり']],
    ['る', ['って', 'った', 'ったら', 'ったり']],
    ['う', ['って', 'った', 'ったら', 'ったり']],
];
let tte = new Map([]);
for (const [tail, quad] of tteRaw) {
    tte.set(tail, quad);
}
function conjugateTypeI(verb, conj) {
    {
        if (verb === 'する') {
            return conjugateSuru(verb, conj);
        }
        else if (verb === 'くる' || verb === '来る') {
            return conjugateKuru(verb, conj);
        }
        const specialHit = specialCases.get(verb);
        if (specialHit && specialHit.has(conj)) {
            return [specialHit.get(conj) || ''];
        }
        // The above inner-most `get` is guaranteed to be not-undefined, so the empty string will never be returned, but
        // TypeScript 3.0.1 doesn't treat `Map.has` as a type guard 😣.
    }
    const head = verb.slice(0, -1);
    const tail = verb.slice(-1);
    const idx = conjToIdx.get(conj === 'Imperative' ? 'Conditional' : conj);
    if (typeof idx === 'undefined') {
        throw new Error('Conjugation not yet implemented');
    }
    if (idx < 5) {
        if (tail === 'う') {
            if (idx === 0) {
                return [head + 'わ'];
            }
            return [head + hiragana_1.lookup('あ', idx)];
        }
        return [head + hiragana_1.lookup(tail, idx)];
    }
    const tidx = idx - 5;
    const tteHit = tte.get((verb === '行く' || verb === 'いく') ? 'つ' : tail);
    if (!tteHit) {
        throw new Error('Unknown verb ending. Is it in dictionary form?');
    }
    return [head + tteHit[tidx]];
}
exports.conjugateTypeI = conjugateTypeI;
function conjugateTypeII(verb, conj) {
    if (verb === 'する') {
        return conjugateSuru(verb, conj);
    }
    else if (verb === 'くる' || verb === '来る') {
        return conjugateKuru(verb, conj);
    }
    const head = verb.slice(0, -1);
    switch (conj) {
        case 'Negative': return [head];
        case 'Conjunctive': return [head];
        case 'Dictionary': return [verb];
        case 'Conditional': return [head + 'れ'];
        case 'Imperative': return [head + 'ろ', head + 'よ'];
        case 'Volitional': return [head + 'よう'];
        case 'Te': return [head + 'て'];
        case 'Ta': return [head + 'た'];
        case 'Tara': return [head + 'たら'];
        case 'Tari': return [head + 'たり'];
        default: throw new Error('Unhandled conjugation');
    }
}
exports.conjugateTypeII = conjugateTypeII;
function conjugateKuru(verb, conj) {
    let ret = '';
    switch (conj) {
        case 'Negative':
            ret = 'こ';
            break;
        case 'Conjunctive':
            ret = 'き';
            break;
        case 'Dictionary':
            ret = 'くる';
            break;
        case 'Conditional':
            ret = 'くれ';
            break;
        case 'Imperative':
            ret = 'こい';
            break;
        case 'Volitional':
            ret = 'こよう';
            break;
        case 'Te':
            ret = 'きて';
            break;
        case 'Ta':
            ret = 'きた';
            break;
        case 'Tara':
            ret = 'きたら';
            break;
        case 'Tari':
            ret = 'きたり';
            break;
        default: throw new Error('Unhandled conjugation');
    }
    const head = verb.slice(0, -1);
    if (head === 'く') {
        return [ret];
    }
    else if (head === '来') {
        return ['来' + ret.slice(1)];
    }
    throw new Error('Expected input to be 来る or くる');
}
function conjugateSuru(verb, conj) {
    switch (conj) {
        case 'Negative': return ['し'];
        case 'Conjunctive': return ['し'];
        case 'Dictionary': return ['する'];
        case 'Conditional': return ['すれ'];
        case 'Imperative': return ['しろ', 'せよ'];
        case 'Volitional': return ['しよう'];
        case 'Te': return ['して'];
        case 'Ta': return ['した'];
        case 'Tara': return ['したら'];
        case 'Tari': return ['したり'];
        default: throw new Error('Unhandled conjugation');
    }
}
function conjugateStrict(verb, conj, typeII = false) {
    return ((verb.slice(-1) === 'る' && typeII) ? conjugateTypeII : conjugateTypeI)(verb, conj);
}
function conjugate(verb, conj, typeII = false) {
    const ret = conjugateStrict(verb, conj, typeII);
    if (conj === 'Negative') {
        ret.push(ret[0] + 'ない');
    }
    else if (conj === 'Conjunctive') {
        ret.push(ret[0] + 'ます');
    }
    else if (conj === 'Conditional') {
        ret.push(ret[0] + 'ば');
    }
    else if (conj === 'Volitional') {
        ret.push(ret[0] + 'う');
    }
    return ret;
}
exports.conjugate = conjugate;
function conjugateAuxiliary(verb, aux, conj, typeII = false) {
    if (aux === 'Potential') {
        const newverb = conjugateTypeI(verb, 'Conditional')[0] + 'る';
        return conjugateTypeII(newverb, conj);
    }
    else if (aux === 'Masu') {
        const base = conjugate(verb, 'Conjunctive', typeII)[0];
        switch (conj) {
            case 'Negative': return [base + 'ません', base + 'ませんでした'];
            // case 'Conjunctive':
            case 'Dictionary': return [base + 'ます'];
            case 'Conditional': return [base + 'ますれば'];
            case 'Imperative': return [base + 'ませ', base + 'まし']; // latter only for nasaru and ossharu
            case 'Volitional': return [base + 'ましょう'];
            case 'Te': return [base + 'まして'];
            case 'Ta': return [base + 'ました'];
            case 'Tara': return [base + 'ましたら'];
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'Nai') {
        const base = conjugate(verb, 'Negative', typeII)[0];
        switch (conj) {
            case 'Negative': return [base + 'なくはない'];
            case 'Conjunctive': return [base + 'なく'];
            case 'Dictionary': return [base + 'ない'];
            case 'Conditional': return [base + 'なければ'];
            // case 'Imperative':
            // case 'Volitional':
            case 'Te': return [base + 'なくて'];
            case 'Ta': return [base + 'なかった'];
            case 'Tara': return [base + 'なかったら'];
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'Tai') {
        const base = conjugate(verb, 'Conjunctive', typeII)[0];
        switch (conj) {
            case 'Negative': return [base + 'たくない'];
            case 'Conjunctive': return [base + 'たく'];
            case 'Dictionary': return [base + 'たい'];
            case 'Conditional': return [base + 'たければ'];
            // case 'Imperative':
            // case 'Volitional':
            case 'Te': return [base + 'たくて'];
            case 'Ta': return [base + 'たかった'];
            case 'Tara': return [base + 'たかったら'];
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'Tagaru') {
        switch (conj) {
            case 'Conditional':
            case 'Imperative':
            case 'Volitional':
            case 'Tari': throw new Error('Unhandled conjugation');
        }
        const bases = conjugate(verb, 'Conjunctive', typeII);
        const tagaruConj = conjugate('たがる', conj, false);
        return tagaruConj.map(suffix => bases[0] + suffix);
    }
    else if (aux === 'Hoshii') {
        const base = conjugate(verb, 'Te', typeII)[0];
        switch (conj) {
            case 'Negative': return [base + 'ほしくない'];
            case 'Conjunctive': return [base + 'ほしく'];
            case 'Dictionary': return [base + 'ほしい'];
            case 'Conditional': return [base + 'ほしければ'];
            // case 'Imperative':
            // case 'Volitional':
            case 'Te': return [base + 'ほしくて'];
            case 'Ta': return [base + 'ほしかった'];
            case 'Tara': return [base + 'ほしかったら'];
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'Rashii') {
        const base1 = conjugate(verb, 'Ta', typeII)[0];
        const base2 = verb;
        const append = (suffix) => [base1, base2].map(prefix => prefix + suffix);
        switch (conj) {
            case 'Negative':
                const neg = conjugateAuxiliary(verb, 'Nai', 'Dictionary')[0];
                return [neg + 'らしい'];
            case 'Conjunctive': return append('らしく');
            case 'Dictionary': return append('らしい');
            // case 'Conditional':
            // case 'Imperative':
            // case 'Volitional':
            case 'Te': return append('らしくて');
            // case 'Ta':
            // case 'Tara':
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'SoudaHearsay') {
        const base1 = conjugate(verb, 'Ta', typeII)[0];
        const base2 = verb; // dictionary form
        const append = (suffix) => [base1, base2].map(prefix => prefix + suffix);
        switch (conj) {
            // case 'Negative':
            // case 'Conjunctive':
            case 'Dictionary': return append('そうだ');
            // case 'Conditional':
            // case 'Imperative':
            // case 'Volitional':
            // case 'Te':
            // case 'Ta':
            // case 'Tara':
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'SoudaConjecture') {
        const base = conjugate(verb, 'Conjunctive', typeII)[0];
        const append = (suffix) => [base + suffix];
        switch (conj) {
            // case 'Negative':
            // case 'Conjunctive':
            case 'Dictionary': return append('そうだ');
            case 'Conditional': return append('そうなら');
            // case 'Imperative':
            // case 'Volitional':
            // case 'Te':
            case 'Ta': return append('そうだった');
            // case 'Tara':
            // case 'Tari':
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === 'SeruSaseru' || aux === 'ShortenedCausative') {
        if (conj === 'Tara' || conj === 'Tari') {
            throw new Error('Unhandled conjugation');
        }
        let newverb;
        if (verb === '来る' || verb === 'くる') {
            newverb = verb[0] + 'させる';
        }
        else if (verb === 'する') {
            newverb = 'させる';
        }
        else if (typeII) {
            newverb = conjugateTypeII(verb, 'Negative')[0] + 'させる';
        }
        else { // type I
            newverb = conjugateTypeI(verb, 'Negative')[0] + 'せる';
        }
        if (aux === 'ShortenedCausative') {
            newverb = newverb.slice(0, -2) + 'す';
            return conjugate(newverb, conj, false);
        }
        return conjugate(newverb, conj, true);
    }
    else if (aux === 'ReruRareu') {
        if (conj === 'Conditional' || conj === 'Imperative' || conj === 'Volitional' || conj === 'Tara' ||
            conj === 'Tari') {
            throw new Error('Unhandled conjugation');
        }
        let newverb;
        if (verb === '来る' || verb === 'くる') {
            newverb = verb[0] + 'られる';
        }
        else if (verb === 'する') {
            newverb = 'される';
        }
        else if (typeII) {
            newverb = conjugateTypeII(verb, 'Negative')[0] + 'られる';
        }
        else { // type I
            newverb = conjugateTypeI(verb, 'Negative')[0] + 'れる';
        }
        return conjugate(newverb, conj, true);
    }
    else if (aux === 'CausativePassive') {
        const newverb = conjugateAuxiliary(verb, 'SeruSaseru', 'Negative', typeII)[0] + 'られる';
        return conjugate(newverb, conj, true);
    }
    else if (aux === 'ShortenedCausativePassive') {
        const newverb = conjugateAuxiliary(verb, 'ShortenedCausative', 'Negative', typeII)[0] + 'れる';
        return conjugate(newverb, conj, true);
    }
    else {
        throw new Error('Unhandled auxiliary');
    }
}
exports.conjugateAuxiliary = conjugateAuxiliary;
function deconjugate(conjugated, dictionaryForm, typeII) {
    const hits = [];
    for (const conjugation of exports.conjugations) {
        try {
            const result = conjugate(dictionaryForm, conjugation, typeII);
            if (result.includes(conjugated)) {
                hits.push({ conjugation, result });
            }
        }
        catch (_a) { }
    }
    return hits;
}
exports.deconjugate = deconjugate;
function deconjugateAuxiliary(conjugated, dictionaryForm, typeII) {
    const hits = [];
    for (const aux of exports.auxiliaries) {
        for (const conj of exports.conjugations) {
            try {
                const result = conjugateAuxiliary(dictionaryForm, aux, conj, typeII);
                if (result.includes(conjugated)) {
                    hits.push({ conjugation: conj, auxiliary: aux, result });
                }
            }
            catch (_a) { }
        }
    }
    return hits;
}
exports.deconjugateAuxiliary = deconjugateAuxiliary;
var adjective_1 = require("./adjective");
Object.defineProperty(exports, "adjConjugations", { enumerable: true, get: function () { return adjective_1.adjConjugations; } });
Object.defineProperty(exports, "adjConjugate", { enumerable: true, get: function () { return adjective_1.adjConjugate; } });
Object.defineProperty(exports, "adjDeconjugate", { enumerable: true, get: function () { return adjective_1.adjDeconjugate; } });
