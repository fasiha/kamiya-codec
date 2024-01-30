"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verbDeconjugate = exports.conjugateAuxiliaries = exports.conjugate = exports.conjugateTypeII = exports.conjugateTypeI = exports.auxiliaries = exports.conjugations = void 0;
const hiragana_1 = require("./hiragana");
exports.conjugations = [
  "Negative",
  "Conjunctive",
  "Dictionary",
  "Conditional",
  "Imperative",
  "Volitional",
  "Te",
  "Ta",
  "Tara",
  "Tari",
  "Zu"
];
exports.auxiliaries = [
  "Potential",
  "Masu",
  "Nai",
  "Tai",
  "Tagaru",
  "Hoshii",
  "Rashii",
  "SoudaHearsay",
  "SoudaConjecture",
  "SeruSaseru",
  "ShortenedCausative",
  "ReruRareru",
  "CausativePassive",
  "ShortenedCausativePassive",
  "Ageru",
  "Sashiageru",
  "Yaru",
  "Morau",
  "Itadaku",
  "Kureru",
  "Kudasaru",
  "TeIru",
  "TeAru",
  "Miru",
  "Iku",
  "Kuru",
  "Oku",
  "Shimau",
  "TeOru"
];
const specialCasesRaw = [
  ["\u3042\u308B", "Negative", ""],
  ["\u3054\u3056\u308B", "Conjunctive", "\u3054\u3056\u3044"],
  ["\u3044\u3089\u3063\u3057\u3083\u308B", "Conjunctive", "\u3044\u3089\u3063\u3057\u3083\u3044"],
  ["\u3044\u3089\u3063\u3057\u3083\u308B", "Conditional", "\u3044\u3089\u3063\u3057\u3083\u3044"],
  ["\u3044\u3089\u3063\u3057\u3083\u308B", "Imperative", "\u3044\u3089\u3063\u3057\u3083\u3044"]
];
let specialCases = /* @__PURE__ */ new Map([]);
for (const [verb, conj, result] of specialCasesRaw) {
  let outer = specialCases.get(verb);
  if (outer) {
    outer.set(conj, result);
  } else {
    specialCases.set(verb, /* @__PURE__ */ new Map([[conj, result]]));
  }
}
const conjToIdx = new Map(exports.conjugations.filter((x) => x !== "Imperative").map((x, i) => [x, i]));
conjToIdx.set("Zu", (_a = conjToIdx.get("Negative")) !== null && _a !== void 0 ? _a : -1);
const tteRaw = [
  ["\u304F", ["\u3044\u3066", "\u3044\u305F", "\u3044\u305F\u3089", "\u3044\u305F\u308A"]],
  ["\u3050", ["\u3044\u3067", "\u3044\u3060", "\u3044\u3060\u3089", "\u3044\u3060\u308A"]],
  ["\u3059", ["\u3057\u3066", "\u3057\u305F", "\u3057\u305F\u3089", "\u3057\u305F\u308A"]],
  ["\u306C", ["\u3093\u3067", "\u3093\u3060", "\u3093\u3060\u3089", "\u3093\u3060\u308A"]],
  ["\u3076", ["\u3093\u3067", "\u3093\u3060", "\u3093\u3060\u3089", "\u3093\u3060\u308A"]],
  ["\u3080", ["\u3093\u3067", "\u3093\u3060", "\u3093\u3060\u3089", "\u3093\u3060\u308A"]],
  ["\u3064", ["\u3063\u3066", "\u3063\u305F", "\u3063\u305F\u3089", "\u3063\u305F\u308A"]],
  ["\u308B", ["\u3063\u3066", "\u3063\u305F", "\u3063\u305F\u3089", "\u3063\u305F\u308A"]],
  ["\u3046", ["\u3063\u3066", "\u3063\u305F", "\u3063\u305F\u3089", "\u3063\u305F\u308A"]]
];
let tte = /* @__PURE__ */ new Map([]);
for (const [tail, quad] of tteRaw) {
  tte.set(tail, quad);
}
function conjugateTypeI(verb, conj) {
  {
    if (verb === "\u3059\u308B") {
      return conjugateSuru(verb, conj);
    } else if (verb === "\u304F\u308B" || verb === "\u6765\u308B") {
      return conjugateKuru(verb, conj);
    } else if (verb === "\u3060") {
      return conjugateDa(verb, conj);
    } else if (verb === "\u3067\u3059") {
      return conjugateDesu(verb, conj);
    } else if (verb.endsWith("\u304F\u3060\u3055\u308B")) {
      if (conj === "Dictionary") {
        return [verb];
      } else if (conj === "Conjunctive") {
        return [verb.slice(0, -2) + "\u3055\u3044"];
      } else {
        throw new Error("unknown conjugation for -kudasaru");
      }
    }
    const specialHit = specialCases.get(verb);
    if (specialHit && specialHit.has(conj)) {
      return [specialHit.get(conj) || ""];
    }
  }
  const head = verb.slice(0, -1);
  const tail = verb.slice(-1);
  const idx = conjToIdx.get(conj === "Imperative" ? "Conditional" : conj);
  if (typeof idx === "undefined") {
    throw new Error("Conjugation not yet implemented");
  }
  if (idx < 5) {
    if (tail === "\u3046") {
      if (idx === 0) {
        return [head + "\u308F"];
      }
      return [head + hiragana_1.lookup("\u3042", idx)];
    }
    return [head + hiragana_1.lookup(tail, idx)];
  }
  const tidx = idx - 5;
  const tteHit = tte.get(verb === "\u884C\u304F" || verb === "\u3044\u304F" ? "\u3064" : tail);
  if (!tteHit) {
    throw new Error("Unknown verb ending. Is it in dictionary form?");
  }
  return [head + tteHit[tidx]];
}
exports.conjugateTypeI = conjugateTypeI;
function conjugateTypeII(verb, conj) {
  if (verb === "\u3059\u308B") {
    return conjugateSuru(verb, conj);
  } else if (verb === "\u304F\u308B" || verb === "\u6765\u308B") {
    return conjugateKuru(verb, conj);
  } else if (verb === "\u3060") {
    return conjugateDa(verb, conj);
  } else if (verb === "\u3067\u3059") {
    return conjugateDesu(verb, conj);
  }
  const head = verb.slice(0, -1);
  switch (conj) {
    case "Negative":
    case "Zu":
      return [head];
    case "Conjunctive":
      return [head];
    case "Dictionary":
      return [verb];
    case "Conditional":
      return [head + "\u308C"];
    case "Imperative":
      return [head + "\u308D", head + "\u3088"];
    case "Volitional":
      return [head + "\u3088\u3046"];
    case "Te":
      return [head + "\u3066"];
    case "Ta":
      return [head + "\u305F"];
    case "Tara":
      return [head + "\u305F\u3089"];
    case "Tari":
      return [head + "\u305F\u308A"];
    default:
      throw new Error("Unhandled conjugation");
  }
}
exports.conjugateTypeII = conjugateTypeII;
function conjugateKuru(verb, conj) {
  let ret = "";
  switch (conj) {
    case "Negative":
    case "Zu":
      ret = "\u3053";
      break;
    case "Conjunctive":
      ret = "\u304D";
      break;
    case "Dictionary":
      ret = "\u304F\u308B";
      break;
    case "Conditional":
      ret = "\u304F\u308C";
      break;
    case "Imperative":
      ret = "\u3053\u3044";
      break;
    case "Volitional":
      ret = "\u3053\u3088\u3046";
      break;
    case "Te":
      ret = "\u304D\u3066";
      break;
    case "Ta":
      ret = "\u304D\u305F";
      break;
    case "Tara":
      ret = "\u304D\u305F\u3089";
      break;
    case "Tari":
      ret = "\u304D\u305F\u308A";
      break;
    default:
      throw new Error("Unhandled conjugation");
  }
  const head = verb.slice(0, -1);
  if (head === "\u304F") {
    return [ret];
  } else if (head === "\u6765") {
    return ["\u6765" + ret.slice(1)];
  }
  throw new Error("Expected input to be \u6765\u308B or \u304F\u308B");
}
function conjugateSuru(verb, conj) {
  switch (conj) {
    case "Negative":
      return ["\u3057"];
    case "Conjunctive":
      return ["\u3057"];
    case "Dictionary":
      return ["\u3059\u308B"];
    case "Conditional":
      return ["\u3059\u308C"];
    case "Imperative":
      return ["\u3057\u308D", "\u305B\u3088"];
    case "Volitional":
      return ["\u3057\u3088\u3046"];
    case "Te":
      return ["\u3057\u3066"];
    case "Ta":
      return ["\u3057\u305F"];
    case "Tara":
      return ["\u3057\u305F\u3089"];
    case "Tari":
      return ["\u3057\u305F\u308A"];
    case "Zu":
      return ["\u305B\u305A"];
    default:
      throw new Error("Unhandled conjugation");
  }
}
function conjugateDa(_verb, conj) {
  switch (conj) {
    case "Negative":
      return ["\u3067\u306A\u3044", "\u3067\u306F\u306A\u3044", "\u3058\u3083\u306A\u3044"];
    case "Dictionary":
      return ["\u3060"];
    case "Conditional":
      return ["\u306A\u3089"];
    case "Te":
      return ["\u3067"];
    case "Ta":
      return ["\u3060\u3063\u305F"];
    case "Tara":
      return ["\u3060\u3063\u305F\u3089"];
    case "Tari":
      return ["\u3060\u3063\u305F\u308A"];
    default:
      throw new Error("Unhandled conjugation");
  }
}
function conjugateDesu(_verb, conj) {
  switch (conj) {
    case "Negative":
      return ["\u3067\u3042\u308A\u307E\u305B\u3093", "\u3067\u306F\u3042\u308A\u307E\u305B\u3093"];
    case "Dictionary":
      return ["\u3067\u3059"];
    case "Te":
      return ["\u3067\u3057\u3066"];
    case "Ta":
      return ["\u3067\u3057\u305F"];
    case "Tara":
      return ["\u3067\u3057\u305F\u3089"];
    case "Tari":
      return ["\u3067\u3057\u305F\u308A"];
    default:
      throw new Error("Unhandled conjugation");
  }
}
function conjugateStrict(verb, conj, typeII = false) {
  return (verb.slice(-1) === "\u308B" && typeII ? conjugateTypeII : conjugateTypeI)(verb, conj);
}
function conjugate(verb, conj, typeII = false) {
  const ret = conjugateStrict(verb, conj, typeII);
  if ((conj === "Negative" || conj === "Zu") && (verb !== "\u3060" && verb !== "\u3067\u3059")) {
    ret.push(ret[0] + (conj === "Negative" ? "\u306A\u3044" : "\u305A"));
  } else if (conj === "Conjunctive") {
    ret.push(ret[0] + "\u307E\u3059");
  } else if (conj === "Conditional") {
    ret.push(ret[0] + "\u3070");
  } else if (conj === "Volitional") {
    ret.push(ret[0] + "\u3046");
  }
  return ret;
}
exports.conjugate = conjugate;
function conjugateAuxiliaries(initialVerb, auxs, finalConj, initialTypeII = false) {
  if (auxs.length === 0) {
    return conjugate(initialVerb, finalConj, initialTypeII);
  }
  if (initialVerb === "\u3060" || initialVerb === "\u3067\u3059") {
    if (auxs.length === 1 && auxs[0] === "Nai") {
      if (finalConj === "Ta") {
        if (initialVerb === "\u3060") {
          return ["\u3067\u306F\u306A\u304B\u3063\u305F", "\u3058\u3083\u306A\u304B\u3063\u305F"];
        } else {
          return ["\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F", "\u3067\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F"];
        }
      } else if (finalConj === "Te" && initialVerb === "\u3060") {
        return ["\u3058\u3083\u306A\u304F\u3066"];
      }
    }
    throw new Error("unhandled copula auxiliaries/conjugation");
  }
  let verbs = [initialVerb];
  let typeII = initialTypeII;
  for (const [auxIdx, aux] of auxs.entries()) {
    const conj = auxIdx === auxs.length - 1 ? finalConj : "Dictionary";
    const prevAux = auxs[auxIdx - 1];
    if (auxIdx !== auxs.length - 1 && (aux === "Masu" || aux === "Nai" || aux === "Tai" || aux == "Hoshii" || aux === "Rashii" || aux === "SoudaConjecture" || aux === "SoudaHearsay")) {
      throw new Error("must be final auxiliary");
    }
    if (prevAux === "Kuru") {
      const heads = verbs.map((s) => s.slice(0, -2));
      const tails = conjugateAuxiliary("\u304F\u308B", aux, conj);
      verbs = heads.flatMap((prefix) => tails.map((t) => prefix + t));
    } else {
      verbs = verbs.flatMap((verb) => conjugateAuxiliary(verb, aux, conj, typeII));
    }
    typeII = aux === "Potential" || aux === "SeruSaseru" || aux === "ReruRareru" || aux === "CausativePassive" || aux === "ShortenedCausativePassive" || aux === "Ageru" || aux === "Sashiageru" || aux === "Kureru" || aux === "Miru" || aux === "TeIru";
  }
  return verbs;
}
exports.conjugateAuxiliaries = conjugateAuxiliaries;
function conjugateAuxiliary(verb, aux, conj, typeII = false) {
  if (aux === "Potential") {
    const newverb = conjugateTypeI(verb, "Conditional")[0] + "\u308B";
    return conjugate(newverb, conj, true);
  } else if (aux === "Masu") {
    const base = conjugate(verb, "Conjunctive", typeII)[0];
    switch (conj) {
      case "Negative":
        return [base + "\u307E\u305B\u3093", base + "\u307E\u305B\u3093\u3067\u3057\u305F"];
      case "Dictionary":
        return [base + "\u307E\u3059"];
      case "Conditional":
        return [base + "\u307E\u3059\u308C\u3070"];
      case "Imperative":
        return [base + "\u307E\u305B", base + "\u307E\u3057"];
      case "Volitional":
        return [base + "\u307E\u3057\u3087\u3046"];
      case "Te":
        return [base + "\u307E\u3057\u3066"];
      case "Ta":
        return [base + "\u307E\u3057\u305F"];
      case "Tara":
        return [base + "\u307E\u3057\u305F\u3089"];
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "Nai") {
    const base = conjugate(verb, "Negative", typeII)[0];
    switch (conj) {
      case "Negative":
        return [base + "\u306A\u304F\u306F\u306A\u3044"];
      case "Conjunctive":
        return [base + "\u306A\u304F"];
      case "Dictionary":
        return [base + "\u306A\u3044"];
      case "Conditional":
        return [base + "\u306A\u3051\u308C\u3070"];
      case "Te":
        return [base + "\u306A\u304F\u3066", base + "\u306A\u3044\u3067"];
      case "Ta":
        return [base + "\u306A\u304B\u3063\u305F"];
      case "Tara":
        return [base + "\u306A\u304B\u3063\u305F\u3089"];
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "Tai") {
    const base = conjugate(verb, "Conjunctive", typeII)[0];
    switch (conj) {
      case "Negative":
        return [base + "\u305F\u304F\u306A\u3044"];
      case "Conjunctive":
        return [base + "\u305F\u304F"];
      case "Dictionary":
        return [base + "\u305F\u3044"];
      case "Conditional":
        return [base + "\u305F\u3051\u308C\u3070"];
      case "Te":
        return [base + "\u305F\u304F\u3066"];
      case "Ta":
        return [base + "\u305F\u304B\u3063\u305F"];
      case "Tara":
        return [base + "\u305F\u304B\u3063\u305F\u3089"];
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "Tagaru") {
    switch (conj) {
      case "Conditional":
      case "Imperative":
      case "Volitional":
      case "Tari":
        throw new Error("Unhandled conjugation");
    }
    const bases = conjugate(verb, "Conjunctive", typeII);
    const tagaruConj = conjugate("\u305F\u304C\u308B", conj, false);
    return tagaruConj.map((suffix) => bases[0] + suffix);
  } else if (aux === "Hoshii") {
    const base = conjugate(verb, "Te", typeII)[0];
    switch (conj) {
      case "Negative":
        return [base + "\u307B\u3057\u304F\u306A\u3044"];
      case "Conjunctive":
        return [base + "\u307B\u3057\u304F"];
      case "Dictionary":
        return [base + "\u307B\u3057\u3044"];
      case "Conditional":
        return [base + "\u307B\u3057\u3051\u308C\u3070"];
      case "Te":
        return [base + "\u307B\u3057\u304F\u3066"];
      case "Ta":
        return [base + "\u307B\u3057\u304B\u3063\u305F"];
      case "Tara":
        return [base + "\u307B\u3057\u304B\u3063\u305F\u3089"];
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "Rashii") {
    const base1 = conjugate(verb, "Ta", typeII)[0];
    const base2 = verb;
    const append = (suffix) => [base1, base2].map((prefix) => prefix + suffix);
    switch (conj) {
      case "Negative":
        const neg = conjugateAuxiliary(verb, "Nai", "Dictionary")[0];
        return [neg + "\u3089\u3057\u3044"];
      case "Conjunctive":
        return append("\u3089\u3057\u304F");
      case "Dictionary":
        return append("\u3089\u3057\u3044");
      case "Te":
        return append("\u3089\u3057\u304F\u3066");
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "SoudaHearsay") {
    const base1 = conjugate(verb, "Ta", typeII)[0];
    const base2 = verb;
    const append = (suffix) => [base1, base2].map((prefix) => prefix + suffix);
    switch (conj) {
      case "Dictionary":
        return append("\u305D\u3046\u3060");
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "SoudaConjecture") {
    const base = conjugate(verb, "Conjunctive", typeII)[0];
    switch (conj) {
      case "Dictionary":
        return [base + "\u305D\u3046\u3060", base + "\u305D\u3046\u3067\u3059"];
      case "Conditional":
        return [base + "\u305D\u3046\u306A\u3089"];
      case "Ta":
        return [base + "\u305D\u3046\u3060\u3063\u305F", base + "\u305D\u3046\u3067\u3057\u305F"];
      default:
        throw new Error("Unhandled conjugation");
    }
  } else if (aux === "SeruSaseru" || aux === "ShortenedCausative") {
    if (conj === "Tara" || conj === "Tari") {
      throw new Error("Unhandled conjugation");
    }
    let newverb;
    if (verb === "\u6765\u308B" || verb === "\u304F\u308B") {
      newverb = (verb[0] === "\u6765" ? "\u6765" : "\u3053") + "\u3055\u305B\u308B";
    } else if (verb === "\u3059\u308B") {
      newverb = "\u3055\u305B\u308B";
    } else if (typeII) {
      newverb = conjugateTypeII(verb, "Negative")[0] + "\u3055\u305B\u308B";
    } else {
      newverb = conjugateTypeI(verb, "Negative")[0] + "\u305B\u308B";
    }
    if (aux === "ShortenedCausative") {
      newverb = newverb.slice(0, -2) + "\u3059";
      return conjugate(newverb, conj, false);
    }
    return conjugate(newverb, conj, true);
  } else if (aux === "ReruRareru") {
    if (conj === "Conditional" || conj === "Imperative" || conj === "Volitional" || conj === "Tara" || conj === "Tari") {
      throw new Error("Unhandled conjugation");
    }
    let newverb;
    if (verb === "\u6765\u308B" || verb === "\u304F\u308B") {
      newverb = (verb[0] === "\u6765" ? "\u6765" : "\u3053") + "\u3089\u308C\u308B";
    } else if (verb === "\u3059\u308B") {
      newverb = "\u3055\u308C\u308B";
    } else if (typeII) {
      newverb = conjugateTypeII(verb, "Negative")[0] + "\u3089\u308C\u308B";
    } else {
      newverb = conjugateTypeI(verb, "Negative")[0] + "\u308C\u308B";
    }
    return conjugate(newverb, conj, true);
  } else if (aux === "CausativePassive") {
    const newverb = conjugateAuxiliary(verb, "SeruSaseru", "Negative", typeII)[0] + "\u3089\u308C\u308B";
    return conjugate(newverb, conj, true);
  } else if (aux === "ShortenedCausativePassive") {
    const newverb = conjugateAuxiliary(verb, "ShortenedCausative", "Negative", typeII)[0] + "\u308C\u308B";
    return conjugate(newverb, conj, true);
  } else if (aux === "Ageru" || aux === "Sashiageru" || aux === "Yaru" || aux === "Morau" || aux === "Itadaku" || aux === "Kureru" || aux === "Kudasaru" || aux === "TeIru" || aux === "TeAru" || aux === "Miru" || aux === "Iku" || aux === "Kuru" || aux === "Oku" || aux === "TeOru") {
    const vte = conjugate(verb, "Te", typeII)[0];
    const endings = aux === "Ageru" ? ["\u3042\u3052\u308B"] : aux === "Sashiageru" ? ["\u5DEE\u3057\u4E0A\u3052\u308B", "\u3055\u3057\u3042\u3052\u308B"] : aux === "Yaru" ? ["\u3084\u308B"] : aux === "Morau" ? ["\u3082\u3089\u3046"] : aux === "Itadaku" ? ["\u3044\u305F\u3060\u304F"] : aux === "Kureru" ? ["\u304F\u308C\u308B"] : aux === "Kudasaru" ? ["\u304F\u3060\u3055\u308B"] : aux === "TeIru" ? ["\u3044\u308B", "\u308B"] : aux === "TeAru" ? ["\u3042\u308B"] : aux === "Miru" ? ["\u307F\u308B"] : aux === "Iku" ? ["\u3044\u304F"] : aux === "Kuru" ? ["\u304F\u308B"] : aux === "Oku" ? ["\u304A\u304F"] : aux === "TeOru" ? ["\u304A\u308B"] : [];
    if (!endings[0]) {
      throw new Error("missing ternary");
    }
    if (aux === "Kuru") {
      return conjugate(endings[0], conj).map((suffix) => vte + suffix);
    }
    const endingTypeII = aux === "Ageru" || aux === "Sashiageru" || aux === "Kureru" || aux === "TeIru" || aux === "Miru";
    const newVerbs = endings.map((ending) => vte + ending);
    if (aux === "Oku") {
      newVerbs.push(vte.slice(0, -1) + "\u3068\u304F");
    }
    return newVerbs.flatMap((v) => conjugate(v, conj, endingTypeII));
  } else if (aux === "Shimau") {
    const vte = conjugate(verb, "Te", typeII)[0];
    const shimau = conjugate(vte + "\u3057\u307E\u3046", conj);
    const noTe = vte.slice(0, -1);
    if (vte.endsWith("\u3066")) {
      const chau = conjugate(noTe + "\u3061\u3083\u3046", conj);
      const chimau = conjugate(noTe + "\u3061\u307E\u3046", conj);
      return shimau.concat(chau).concat(chimau);
    }
    const jimau = conjugate(noTe + "\u3058\u307E\u3046", conj);
    const dimau = conjugate(noTe + "\u3062\u307E\u3046", conj);
    return shimau.concat(jimau).concat(dimau);
  }
  isNever(aux);
  throw new Error("Unhandled auxiliary");
}
function isNever(x) {
  return x;
}
function verbDeconjugate(conjugated, dictionaryForm, typeII = false, maxAuxDepth = Infinity) {
  const hits = [];
  for (const conj of exports.conjugations) {
    try {
      const result = conjugate(dictionaryForm, conj, typeII);
      if (result.includes(conjugated)) {
        hits.push({ conjugation: conj, auxiliaries: [], result });
      }
    } catch (_a2) {
    }
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
      } catch (_b) {
      }
    }
  }
  if (maxAuxDepth <= 1) {
    return hits;
  }
  const penultimates = [
    "Ageru",
    "Sashiageru",
    "Yaru",
    "Morau",
    "Itadaku",
    "Kureru",
    "Kudasaru",
    "Miru",
    "Iku",
    "Kuru",
    "Oku",
    "Shimau",
    "TeIru",
    "TeAru",
    "TeOru",
    "Potential",
    "ReruRareru",
    "SeruSaseru"
  ];
  const depth2Finals = ["Masu", "SoudaConjecture", "SoudaHearsay", "TeIru"];
  for (const penultimate of penultimates) {
    for (const final of depth2Finals) {
      for (const conj of exports.conjugations) {
        const auxs = [penultimate, final];
        try {
          const result = conjugateAuxiliaries(dictionaryForm, auxs, conj, typeII);
          if (result.includes(conjugated)) {
            hits.push({ conjugation: conj, auxiliaries: auxs, result });
          }
        } catch (_c) {
        }
      }
    }
  }
  if (maxAuxDepth <= 2) {
    return hits;
  }
  const antepenultimates = ["SeruSaseru", "ReruRareru"];
  const depth3Finals = ["Masu"];
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
          } catch (_d) {
          }
        }
      }
    }
  }
  return hits;
}
exports.verbDeconjugate = verbDeconjugate;
var adjective_1 = require("./adjective");
Object.defineProperty(exports, "adjConjugations", { enumerable: true, get: function() {
  return adjective_1.adjConjugations;
} });
Object.defineProperty(exports, "adjConjugate", { enumerable: true, get: function() {
  return adjective_1.adjConjugate;
} });
Object.defineProperty(exports, "adjDeconjugate", { enumerable: true, get: function() {
  return adjective_1.adjDeconjugate;
} });
