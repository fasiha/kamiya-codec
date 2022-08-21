"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verbDeconjugate = exports.conjugateAuxiliaries = exports.conjugate = exports.conjugateTypeII = exports.conjugateTypeI = exports.auxiliaries = exports.conjugations = void 0;
const hiragana_1 = require("./hiragana");
exports.conjugations = [
    'Negative', 'Conjunctive', 'Dictionary', 'Conditional', 'Imperative', 'Volitional', 'Te', 'Ta', 'Tara', 'Tari',
    'Zu',
];
exports.auxiliaries = [
    'Potential',
    'Masu',
    'Nai',
    'Tai',
    'Tagaru',
    'Hoshii',
    'Rashii',
    'SoudaHearsay',
    'SoudaConjecture',
    'SeruSaseru',
    'ShortenedCausative',
    'ReruRareu',
    'CausativePassive',
    'ShortenedCausativePassive',
    'Ageru',
    'Sashiageru',
    'Yaru',
    'Morau',
    'Itadaku',
    'Kureru',
    'Kudasaru',
    'TeIru',
    'TeAru',
    'Miru',
    'Iku',
    'Kuru',
    'Oku',
    'Shimau',
    'TeOru',
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
conjToIdx.set('Zu', (_a = conjToIdx.get('Negative')) !== null && _a !== void 0 ? _a : -1);
const tteRaw = [
    ['く', ['いて', 'いた', 'いたら', 'いたり']],
    ['ぐ', ['いで', 'いだ', 'いだら', 'いだり']],
    ['す', ['して', 'した', 'したら', 'したり']],
    ['ぬ', ['んで', 'んだ', 'んだら', 'んだり']],
    ['ぶ', ['んで', 'んだ', 'んだら', 'んだり']],
    ['む', ['んで', 'んだ', 'んだら', 'んだり']],
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
        else if (verb === 'だ') {
            return conjugateDa(verb, conj);
        }
        else if (verb === 'です') {
            return conjugateDesu(verb, conj);
        }
        else if (verb.endsWith('くださる')) {
            if (conj === 'Dictionary') {
                return [verb];
            }
            else if (conj === 'Conjunctive') {
                return [verb.slice(0, -2) + 'さい'];
            }
            else {
                throw new Error('unknown conjugation for -kudasaru');
            }
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
    else if (verb === 'だ') {
        return conjugateDa(verb, conj);
    }
    else if (verb === 'です') {
        return conjugateDesu(verb, conj);
    }
    const head = verb.slice(0, -1);
    switch (conj) {
        case 'Negative':
        case 'Zu': return [head];
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
        case 'Zu':
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
        case 'Zu': return ['せず'];
        default: throw new Error('Unhandled conjugation');
    }
}
function conjugateDa(_verb, conj) {
    switch (conj) {
        case 'Negative': return ['でない', 'ではない', 'じゃない'];
        case 'Dictionary': return ['だ'];
        case 'Conditional': return ['なら'];
        // case 'Presumptive': return ['だろう']; // omitting this
        case 'Te': return ['で'];
        case 'Ta': return ['だった'];
        case 'Tara': return ['だったら'];
        case 'Tari': return ['だったり'];
        default: throw new Error('Unhandled conjugation');
    }
}
function conjugateDesu(_verb, conj) {
    switch (conj) {
        case 'Negative': return ['でありません', 'ではありません'];
        case 'Dictionary': return ['です'];
        // case 'Presumptive': return ['でそう']; // omitting this
        case 'Te': return ['でして'];
        case 'Ta': return ['でした'];
        case 'Tara': return ['でしたら'];
        case 'Tari': return ['でしたり'];
        default: throw new Error('Unhandled conjugation');
    }
}
function conjugateStrict(verb, conj, typeII = false) {
    return ((verb.slice(-1) === 'る' && typeII) ? conjugateTypeII : conjugateTypeI)(verb, conj);
}
function conjugate(verb, conj, typeII = false) {
    const ret = conjugateStrict(verb, conj, typeII);
    if ((conj === 'Negative' || conj === 'Zu') && (verb !== 'だ' && verb !== 'です')) {
        // Don't do this for da/desu because their negatives are baked in
        ret.push(ret[0] + (conj === 'Negative' ? 'ない' : 'ず'));
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
function conjugateAuxiliaries(initialVerb, auxs, finalConj, initialTypeII = false) {
    if (auxs.length === 0) {
        return conjugate(initialVerb, finalConj, initialTypeII);
    }
    if (initialVerb === 'だ' || initialVerb === 'です') {
        if (auxs.length === 1 && auxs[0] === 'Nai' && finalConj === 'Ta') {
            if (initialVerb === 'だ') {
                return ['ではなかった', 'じゃなかった'];
            }
            else {
                return ['ではありませんでした', 'でありませんでした'];
            }
        }
        throw new Error('unhandled copula auxiliaries/conjugation');
    }
    let verbs = [initialVerb];
    let typeII = initialTypeII;
    for (const [auxIdx, aux] of auxs.entries()) {
        const conj = auxIdx === auxs.length - 1 ? finalConj : 'Dictionary';
        const prevAux = auxs[auxIdx - 1];
        if (auxIdx !== auxs.length - 1 && (aux === 'Masu' || aux === 'Nai' || aux === 'Tai' || aux == 'Hoshii' ||
            aux === 'Rashii' || aux === 'SoudaConjecture' || aux === 'SoudaHearsay')) {
            throw new Error('must be final auxiliary');
        }
        if (prevAux === 'Kuru') {
            // While `conjugate` looks for with Kudasaru with `endsWith`, it looks for Kuru with exact-compare (because
            // potentially lots of things could end in kuru)
            const heads = verbs.map(s => s.slice(0, -2));
            const tails = conjugateAuxiliary('くる', aux, conj);
            verbs = heads.flatMap(prefix => tails.map(t => prefix + t));
        }
        else {
            verbs = verbs.flatMap(verb => conjugateAuxiliary(verb, aux, conj, typeII));
        }
        typeII = aux === 'Potential' || aux === 'SeruSaseru' || aux === 'ReruRareu' || aux === 'CausativePassive' ||
            aux === 'ShortenedCausativePassive' || aux === 'Ageru' || aux === 'Sashiageru' || aux === 'Kureru' ||
            aux === 'Miru' || aux === 'TeIru';
    }
    return verbs;
}
exports.conjugateAuxiliaries = conjugateAuxiliaries;
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
            case 'Te': return [base + 'なくて', base + 'ないで']; // only the first is in Kamiya
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
        switch (conj) {
            // case 'Negative':
            // case 'Conjunctive':
            case 'Dictionary': return [base + 'そうだ', base + 'そうです'];
            case 'Conditional': return [base + 'そうなら'];
            // case 'Imperative':
            // case 'Volitional':
            // case 'Te':
            case 'Ta': return [base + 'そうだった', base + 'そうでした'];
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
            newverb = (verb[0] === '来' ? '来' : 'こ') + 'させる';
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
            newverb = (verb[0] === '来' ? '来' : 'こ') + 'られる';
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
    else if (aux === 'Ageru' || aux === 'Sashiageru' || aux === 'Yaru' || aux === 'Morau' || aux === 'Itadaku' ||
        aux === 'Kureru' || aux === 'Kudasaru' || aux === 'TeIru' || aux === 'TeAru' || aux === 'Miru' ||
        aux === 'Iku' || aux === 'Kuru' || aux === 'Oku' || aux === 'TeOru') {
        const vte = conjugate(verb, 'Te', typeII)[0];
        const endings = aux === 'Ageru' ? ['あげる']
            : aux === 'Sashiageru' ? ['差し上げる', 'さしあげる']
                : aux === 'Yaru' ? ['やる']
                    : aux === 'Morau' ? ['もらう']
                        : aux === 'Itadaku' ? ['いただく']
                            : aux === 'Kureru' ? ['くれる']
                                : aux === 'Kudasaru' ? ['くださる']
                                    : aux === 'TeIru' ? ['いる', 'る']
                                        : aux === 'TeAru' ? ['ある']
                                            : aux === 'Miru' ? ['みる']
                                                : aux === 'Iku' ? ['いく']
                                                    : aux === 'Kuru' ? ['くる']
                                                        : aux === 'Oku' ? ['おく']
                                                            : aux === 'TeOru' ? ['おる']
                                                                : [];
        if (!endings[0]) {
            throw new Error('missing ternary');
        }
        if (aux === 'Kuru') {
            return conjugate(endings[0], conj).map(suffix => vte + suffix);
        }
        const endingTypeII = aux === 'Ageru' || aux === 'Sashiageru' || aux === 'Kureru' || aux === 'TeIru' || aux === 'Miru';
        const newVerbs = endings.map(ending => vte + ending);
        return newVerbs.flatMap(v => conjugate(v, conj, endingTypeII));
    }
    else if (aux === 'Shimau') {
        const vte = conjugate(verb, 'Te', typeII)[0];
        const shimau = conjugate(vte + 'しまう', conj);
        const noTe = vte.slice(0, -1);
        // see https://www.sljfaq.org/afaq/colloquial-contractions.html
        if (vte.endsWith('て')) {
            // no rendaku
            const chau = conjugate(noTe + 'ちゃう', conj);
            const chimau = conjugate(noTe + 'ちまう', conj);
            return shimau.concat(chau).concat(chimau);
        }
        const jimau = conjugate(noTe + 'じまう', conj);
        const dimau = conjugate(noTe + 'ぢまう', conj);
        return shimau.concat(jimau).concat(dimau);
    }
    isNever(aux);
    throw new Error('Unhandled auxiliary');
}
function isNever(x) { return x; }
function verbDeconjugate(conjugated, dictionaryForm, typeII = false, maxAuxDepth = Infinity) {
    const hits = [];
    for (const conj of exports.conjugations) {
        try {
            const result = conjugate(dictionaryForm, conj, typeII);
            if (result.includes(conjugated)) {
                hits.push({ conjugation: conj, auxiliaries: [], result });
            }
        }
        catch (_a) { }
    }
    if (maxAuxDepth <= 0) {
        return hits;
    }
    for (const aux of exports.auxiliaries) {
        for (const conj of exports.conjugations) {
            try {
                const result = conjugateAuxiliary(dictionaryForm, aux, conj, typeII);
                if (result.includes(conjugated)) {
                    hits.push({ conjugation: conj, auxiliaries: [aux], result });
                }
            }
            catch (_b) { }
        }
    }
    if (maxAuxDepth <= 1) {
        return hits;
    }
    const penultimates = [
        'Ageru', 'Sashiageru', 'Yaru', 'Morau', 'Itadaku', 'Kureru', 'Kudasaru', 'Miru', 'Iku', 'Kuru', 'Oku', 'Shimau',
        'TeIru', 'TeAru', 'TeOru', 'Potential', 'ReruRareu', 'SeruSaseru'
    ];
    const depth2Finals = ['Masu', 'SoudaConjecture', 'SoudaHearsay', 'TeIru'];
    for (const penultimate of penultimates) {
        for (const final of depth2Finals) {
            for (const conj of exports.conjugations) {
                const auxs = [penultimate, final];
                try {
                    const result = conjugateAuxiliaries(dictionaryForm, auxs, conj, typeII);
                    if (result.includes(conjugated)) {
                        hits.push({ conjugation: conj, auxiliaries: auxs, result });
                    }
                }
                catch (_c) { }
            }
        }
    }
    if (maxAuxDepth <= 2) {
        return hits;
    }
    const antepenultimates = ['SeruSaseru', 'ReruRareu'];
    const depth3Finals = ['Masu'];
    for (const ante of antepenultimates) {
        for (const penultimate of penultimates) {
            for (const final of depth3Finals) {
                for (const conj of exports.conjugations) {
                    const auxs = [ante, penultimate, final];
                    try {
                        const result = conjugateAuxiliaries(dictionaryForm, auxs, conj, typeII);
                        if (result.includes(conjugated)) {
                            hits.push({ conjugation: conj, auxiliaries: auxs, result });
                        }
                    }
                    catch (_d) { }
                }
            }
        }
    }
    return hits;
}
exports.verbDeconjugate = verbDeconjugate;
var adjective_1 = require("./adjective");
Object.defineProperty(exports, "adjConjugations", { enumerable: true, get: function () { return adjective_1.adjConjugations; } });
Object.defineProperty(exports, "adjConjugate", { enumerable: true, get: function () { return adjective_1.adjConjugate; } });
Object.defineProperty(exports, "adjDeconjugate", { enumerable: true, get: function () { return adjective_1.adjDeconjugate; } });
