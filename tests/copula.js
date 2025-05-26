"use strict";
const { conjugateAuxiliaries, conjugate } = require("../index");
const test = require("tape");

test("conjugation (no aux)", (t) => {
  t.ok(conjugate("だ", "Negative").includes("じゃない"));
  t.ok(conjugate("だ", "Conditional").includes("なら"));
  t.ok(conjugate("だ", "Ta").includes("だった"));

  t.ok(conjugate("です", "Negative").includes("ではありません"));
  t.ok(conjugate("です", "Dictionary").includes("です"));
  t.ok(conjugate("です", "Ta").includes("でした"));

  t.end();
});

test("nai/past", (t) => {
  t.ok(conjugateAuxiliaries("だ", ["Nai"], "Ta").includes("じゃなかった"));
  t.ok(
    conjugateAuxiliaries("です", ["Nai"], "Ta").includes(
      "ではありませんでした",
    ),
  );
  t.end();
});

test("nai + te/conjunctive", (t) => {
  t.ok(conjugateAuxiliaries("だ", ["Nai"], "Te").includes("じゃなくて"));
  t.ok(conjugateAuxiliaries("だ", ["Nai"], "Conjunctive").includes("じゃなく"));
  t.end();
});
