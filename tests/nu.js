"use strict";
const { conjugate, verbDeconjugate } = require("../index");
const test = require("tape");

test("Nu", (t) => {
  t.ok(conjugate("食べる", "Nu", true).includes("食べぬ"));
  t.ok(conjugate("いく", "Nu").includes("いかぬ"));
  t.ok(conjugate("する", "Nu").includes("せぬ"));
  t.ok(conjugate("くる", "Nu").includes("こぬ"));
  t.ok(conjugate("来る", "Nu").includes("来ぬ"));
  t.end();
});

test("deconj", (t) => {
  t.ok(verbDeconjugate("食べぬ", "食べる", true).length > 0);
  t.ok(verbDeconjugate("いかぬ", "いく").length > 0);
  t.ok(verbDeconjugate("せぬ", "する").length > 0);
  t.ok(verbDeconjugate("こぬ", "くる").length > 0);
  t.ok(verbDeconjugate("来ぬ", "来る").length > 0);
  t.end();
});
