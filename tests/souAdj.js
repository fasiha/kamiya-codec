"use strict";
const { adjConjugate, adjDeconjugate } = require("../index");
const test = require("tape");

test("i positive", (t) => {
  t.ok(adjConjugate("美味しい", "StemSou", true).includes("美味しそう"));
  const res = adjDeconjugate("美味しそう", "美味しい", true);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemSou");
  t.end();
});

test("i neg", (t) => {
  t.ok(
    adjConjugate("美味しい", "StemNegativeSou", true).includes(
      "美味しくなさそう",
    ),
  );
  const res = adjDeconjugate("美味しくなさそう", "美味しい", true);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemNegativeSou");
  t.end();
});

test("na positive", (t) => {
  t.ok(adjConjugate("元気", "StemSou", false).includes("元気そう"));
  const res = adjDeconjugate("元気そう", "元気", false);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemSou");
  t.end();
});

test("na neg", (t) => {
  t.ok(
    adjConjugate("上手", "StemNegativeSou", false).includes("上手じゃなさそう"),
  );
  const res = adjDeconjugate("上手じゃなさそう", "上手", false);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemNegativeSou");
  t.end();
});

test("ii yoi", (t) => {
  t.ok(adjConjugate("いい", "StemSou", true).includes("よさそう"));
  const res = adjDeconjugate("よさそう", "いい", true);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemSou");
  t.end();
});

test("ii yoi neg", (t) => {
  t.ok(adjConjugate("いい", "StemNegativeSou", true).includes("よくなさそう"));
  const res = adjDeconjugate("よくなさそう", "いい", true);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemNegativeSou");
  t.end();
});

test("ii yoi kanji", (t) => {
  t.ok(adjConjugate("良い", "StemSou", true).includes("良さそう"));
  const res = adjDeconjugate("良さそう", "良い", true);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemSou");
  t.end();
});

test("nai", (t) => {
  t.ok(
    adjConjugate("美味しい", "StemNegativeSou", true).includes(
      "美味しくなさそう",
    ),
  );
  const res = adjDeconjugate("美味しくなさそう", "美味しい", true);
  t.ok(res.length > 0);
  t.ok(res[0].conjugation === "StemNegativeSou");
  t.end();
});
