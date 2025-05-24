"use strict";
const lookup = require("../hiragana").lookup;
const test = require("tape");

const tests = [
  ["あ", 0, "あ"],
  ["あ", 1, "い"],
  ["あ", 2, "う"],
  ["あ", 3, "え"],
  ["あ", 4, "お"],
  ["う", 0, "あ"],
  ["う", 1, "い"],
  ["う", 2, "う"],
  ["う", 3, "え"],
  ["う", 4, "お"],
  ["ぎ", 4, "ご"],
];
test("check some hiragana", (t) => {
  for (const [char, vowel, result] of tests) {
    t.equal(lookup(char, vowel), result);
  }
  t.end();
});
