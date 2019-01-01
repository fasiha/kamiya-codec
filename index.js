"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hiragana_1 = require("./hiragana");
var Conjugation;
(function (Conjugation) {
    Conjugation[Conjugation["Negative"] = 0] = "Negative";
    Conjugation[Conjugation["Conjunctive"] = 1] = "Conjunctive";
    Conjugation[Conjugation["Dictionary"] = 2] = "Dictionary";
    Conjugation[Conjugation["Conditional"] = 3] = "Conditional";
    Conjugation[Conjugation["Imperative"] = 4] = "Imperative";
    Conjugation[Conjugation["Volitional"] = 5] = "Volitional";
    Conjugation[Conjugation["Te"] = 6] = "Te";
    Conjugation[Conjugation["Ta"] = 7] = "Ta";
    Conjugation[Conjugation["Tara"] = 8] = "Tara";
    Conjugation[Conjugation["Tari"] = 9] = "Tari";
})(Conjugation = exports.Conjugation || (exports.Conjugation = {}));
var Auxiliary;
(function (Auxiliary) {
    Auxiliary[Auxiliary["Potential"] = 0] = "Potential";
    Auxiliary[Auxiliary["Masu"] = 1] = "Masu";
    Auxiliary[Auxiliary["Nai"] = 2] = "Nai";
    Auxiliary[Auxiliary["Tai"] = 3] = "Tai";
    Auxiliary[Auxiliary["Tagaru"] = 4] = "Tagaru";
    Auxiliary[Auxiliary["Hoshii"] = 5] = "Hoshii";
    Auxiliary[Auxiliary["Rashii"] = 6] = "Rashii";
    Auxiliary[Auxiliary["SoudaHearsay"] = 7] = "SoudaHearsay";
    Auxiliary[Auxiliary["SoudaConjecture"] = 8] = "SoudaConjecture";
    Auxiliary[Auxiliary["SeruSaseru"] = 9] = "SeruSaseru";
    Auxiliary[Auxiliary["ShortenedCausative"] = 10] = "ShortenedCausative";
    Auxiliary[Auxiliary["ReruRareu"] = 11] = "ReruRareu";
    Auxiliary[Auxiliary["CausativePassive"] = 12] = "CausativePassive";
    Auxiliary[Auxiliary["ShortenedCausativePassive"] = 13] = "ShortenedCausativePassive";
})(Auxiliary = exports.Auxiliary || (exports.Auxiliary = {}));
const specialCasesRaw = [
    ['ある', Conjugation.Negative, ''],
    ['ござる', Conjugation.Conjunctive, 'ござい'],
    ['いらっしゃる', Conjugation.Conjunctive, 'いらっしゃい'],
    ['いらっしゃる', Conjugation.Conditional, 'いらっしゃい'],
    ['いらっしゃる', Conjugation.Imperative, 'いらっしゃい'],
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
const conjToIdx = new Map([
    Conjugation.Negative, Conjugation.Conjunctive, Conjugation.Dictionary, Conjugation.Conditional,
    Conjugation.Volitional, Conjugation.Te, Conjugation.Ta, Conjugation.Tara, Conjugation.Tari
].map((x, i) => [x, i]));
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
    const idx = conjToIdx.get(conj === Conjugation.Imperative ? Conjugation.Conditional : conj);
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
        case Conjugation.Negative: return [head];
        case Conjugation.Conjunctive: return [head];
        case Conjugation.Dictionary: return [verb];
        case Conjugation.Conditional: return [head + 'れ'];
        case Conjugation.Imperative: return [head + 'ろ', head + 'よ'];
        case Conjugation.Volitional: return [head + 'よう'];
        case Conjugation.Te: return [head + 'て'];
        case Conjugation.Ta: return [head + 'た'];
        case Conjugation.Tara: return [head + 'たら'];
        case Conjugation.Tari: return [head + 'たり'];
        default: throw new Error('Unhandled conjugation');
    }
}
exports.conjugateTypeII = conjugateTypeII;
function conjugateKuru(verb, conj) {
    let ret = '';
    switch (conj) {
        case Conjugation.Negative:
            ret = 'こ';
            break;
        case Conjugation.Conjunctive:
            ret = 'き';
            break;
        case Conjugation.Dictionary:
            ret = 'くる';
            break;
        case Conjugation.Conditional:
            ret = 'くれ';
            break;
        case Conjugation.Imperative:
            ret = 'こい';
            break;
        case Conjugation.Volitional:
            ret = 'こよう';
            break;
        case Conjugation.Te:
            ret = 'きて';
            break;
        case Conjugation.Ta:
            ret = 'きた';
            break;
        case Conjugation.Tara:
            ret = 'きたら';
            break;
        case Conjugation.Tari:
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
        case Conjugation.Negative: return ['し'];
        case Conjugation.Conjunctive: return ['し'];
        case Conjugation.Dictionary: return ['する'];
        case Conjugation.Conditional: return ['すれ'];
        case Conjugation.Imperative: return ['しろ', 'せよ'];
        case Conjugation.Volitional: return ['しよう'];
        case Conjugation.Te: return ['して'];
        case Conjugation.Ta: return ['した'];
        case Conjugation.Tara: return ['したら'];
        case Conjugation.Tari: return ['したり'];
        default: throw new Error('Unhandled conjugation');
    }
}
function conjugate(verb, conj, typeII = false) {
    return ((verb.slice(-1) === 'る' && typeII) ? conjugateTypeII : conjugateTypeI)(verb, conj);
}
exports.conjugate = conjugate;
function conjugateAuxiliary(verb, aux, conj, typeII = false) {
    if (aux === Auxiliary.Potential) {
        const newverb = conjugateTypeI(verb, Conjugation.Conditional)[0] + 'る';
        return conjugateTypeII(newverb, conj);
    }
    else if (aux === Auxiliary.Masu) {
        const base = conjugate(verb, Conjugation.Conjunctive, typeII);
        switch (conj) {
            case Conjugation.Negative: return [base + 'ません'];
            // case Conjugation.Conjunctive:
            case Conjugation.Dictionary: return [base + 'ます'];
            case Conjugation.Conditional: return [base + 'ますれば'];
            case Conjugation.Imperative: return [base + 'ませ'];
            case Conjugation.Volitional: return [base + 'ましょう'];
            case Conjugation.Te: return [base + 'まして'];
            case Conjugation.Ta: return [base + 'ました'];
            case Conjugation.Tara: return [base + 'ましたら'];
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.Nai) {
        const base = conjugate(verb, Conjugation.Negative, typeII);
        switch (conj) {
            case Conjugation.Negative: return [base + 'なくはない'];
            case Conjugation.Conjunctive: return [base + 'なく'];
            case Conjugation.Dictionary: return [base + 'ない'];
            case Conjugation.Conditional: return [base + 'なければ'];
            // case Conjugation.Imperative:
            // case Conjugation.Volitional:
            case Conjugation.Te: return [base + 'なくて'];
            case Conjugation.Ta: return [base + 'なかった'];
            case Conjugation.Tara: return [base + 'なかったら'];
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.Tai) {
        const base = conjugate(verb, Conjugation.Conjunctive, typeII);
        switch (conj) {
            case Conjugation.Negative: return [base + 'たくない'];
            case Conjugation.Conjunctive: return [base + 'たく'];
            case Conjugation.Dictionary: return [base + 'たい'];
            case Conjugation.Conditional: return [base + 'たければ'];
            // case Conjugation.Imperative:
            // case Conjugation.Volitional:
            case Conjugation.Te: return [base + 'たくて'];
            case Conjugation.Ta: return [base + 'たかった'];
            case Conjugation.Tara: return [base + 'たかったら'];
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.Tagaru) {
        switch (conj) {
            case Conjugation.Conditional:
            case Conjugation.Imperative:
            case Conjugation.Volitional:
            case Conjugation.Tari: throw new Error('Unhandled conjugation');
        }
        const base = conjugate(verb, Conjugation.Conjunctive, typeII);
        const tagaruConj = conjugateTypeI('たがる', conj);
        return [base[0] + tagaruConj[0]];
    }
    else if (aux === Auxiliary.Hoshii) {
        const base = conjugate(verb, Conjugation.Te, typeII);
        switch (conj) {
            case Conjugation.Negative: return [base + 'ほしくない'];
            case Conjugation.Conjunctive: return [base + 'ほしく'];
            case Conjugation.Dictionary: return [base + 'ほしい'];
            case Conjugation.Conditional: return [base + 'ほしければ'];
            // case Conjugation.Imperative:
            // case Conjugation.Volitional:
            case Conjugation.Te: return [base + 'ほしくて'];
            case Conjugation.Ta: return [base + 'ほしかった'];
            case Conjugation.Tara: return [base + 'ほしかったら'];
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.Rashii) {
        const base1 = conjugate(verb, Conjugation.Ta, typeII);
        const base2 = verb;
        const append = (suffix) => [base1, base2].map(prefix => prefix + suffix);
        switch (conj) {
            case Conjugation.Negative:
                const neg = conjugateAuxiliary(verb, Auxiliary.Nai, Conjugation.Dictionary);
                return [neg + 'らしい'];
            case Conjugation.Conjunctive: return append('らしく');
            case Conjugation.Dictionary: return append('らしい');
            // case Conjugation.Conditional:
            // case Conjugation.Imperative:
            // case Conjugation.Volitional:
            case Conjugation.Te: return append('らしくて');
            // case Conjugation.Ta:
            // case Conjugation.Tara:
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.SoudaHearsay) {
        const base1 = conjugate(verb, Conjugation.Ta, typeII)[0];
        const base2 = verb; // dictionary form
        const append = (suffix) => [base1, base2].map(prefix => prefix + suffix);
        switch (conj) {
            // case Conjugation.Negative:
            // case Conjugation.Conjunctive:
            case Conjugation.Dictionary: return append('そうだ');
            // case Conjugation.Conditional:
            // case Conjugation.Imperative:
            // case Conjugation.Volitional:
            // case Conjugation.Te:
            // case Conjugation.Ta:
            // case Conjugation.Tara:
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.SoudaConjecture) {
        const base = conjugate(verb, Conjugation.Conjunctive, typeII);
        const append = (suffix) => [base + suffix];
        switch (conj) {
            // case Conjugation.Negative:
            // case Conjugation.Conjunctive:
            case Conjugation.Dictionary: return append('そうだ');
            case Conjugation.Conditional: return append('そうなら');
            // case Conjugation.Imperative:
            // case Conjugation.Volitional:
            // case Conjugation.Te:
            case Conjugation.Ta: return append('そうだった');
            // case Conjugation.Tara:
            // case Conjugation.Tari:
            default: throw new Error('Unhandled conjugation');
        }
    }
    else if (aux === Auxiliary.SeruSaseru || aux === Auxiliary.ShortenedCausative) {
        if (conj === Conjugation.Tara || conj === Conjugation.Tari) {
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
            newverb = conjugateTypeII(verb, Conjugation.Negative)[0] + 'させる';
        }
        else { // type I
            newverb = conjugateTypeI(verb, Conjugation.Negative)[0] + 'せる';
        }
        if (aux === Auxiliary.ShortenedCausative) {
            newverb = newverb.slice(0, -2) + 'す';
            return conjugateTypeI(newverb, conj);
        }
        return conjugateTypeII(newverb, conj);
    }
    else if (aux === Auxiliary.ReruRareu) {
        if (conj === Conjugation.Conditional || conj === Conjugation.Imperative || conj === Conjugation.Volitional ||
            conj === Conjugation.Tara || conj === Conjugation.Tari) {
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
            newverb = conjugateTypeII(verb, Conjugation.Negative)[0] + 'られる';
        }
        else { // type I
            newverb = conjugateTypeI(verb, Conjugation.Negative)[0] + 'れる';
        }
        return conjugateTypeII(newverb, conj);
    }
    else if (aux === Auxiliary.CausativePassive) {
        const newverb = conjugateAuxiliary(verb, Auxiliary.SeruSaseru, Conjugation.Negative, typeII)[0] + 'られる';
        return conjugateTypeII(newverb, conj);
    }
    else if (aux === Auxiliary.ShortenedCausativePassive) {
        const newverb = conjugateAuxiliary(verb, Auxiliary.ShortenedCausative, Conjugation.Negative, typeII)[0] + 'れる';
        return conjugateTypeII(newverb, conj);
    }
    else {
        throw new Error('Unhandled auxiliary');
    }
}
exports.conjugateAuxiliary = conjugateAuxiliary;
