const typeIEndings = new Set<String>('くぐすつぬぶむう'.split(''));
const esEndings = new Set<String>('えけげせぜてでねへべぺめれ'.split(''));
const isEndings = new Set<String>('いきぎしじちにひびぴみり'.split(''));
export function verbToRowGuess(verb: String) {
  if (verb === '来る' || verb === 'する') { return verb; }
  let tail = verb.trim().slice(-1);
  if (typeIEndings.has(tail)) {
    return tail;
  } else if (tail === 'る') {
    let pretail = verb.trim().slice(-2, -1);
    if (esEndings.has(pretail)) { return 'える'; }
    if (isEndings.has(pretail)) { return 'いる'; }
    return tail;
  }
  throw new Error("Couldn't determine verb's type. Is it in dictionary form?")
}