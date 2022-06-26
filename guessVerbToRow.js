"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeIEndings = new Set('くぐすつぬぶむう'.split(''));
const esEndings = new Set('えけげせぜてでねへべぺめれ'.split(''));
const isEndings = new Set('いきぎしじちにひびぴみり'.split(''));
function guessVerbToRow(verb) {
    if (verb === '来る' || verb === 'する') {
        return verb;
    }
    let tail = verb.trim().slice(-1);
    if (typeIEndings.has(tail)) {
        return tail;
    }
    else if (tail === 'る') {
        let pretail = verb.trim().slice(-2, -1);
        if (esEndings.has(pretail)) {
            return 'える';
        }
        if (isEndings.has(pretail)) {
            return 'いる';
        }
        return tail;
    }
    throw new Error("Couldn't determine verb's type. Is it in dictionary form?");
}
exports.guessVerbToRow = guessVerbToRow;
