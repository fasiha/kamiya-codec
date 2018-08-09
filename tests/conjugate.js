"use strict";
const {conjugateTypeI, conjugateTypeII, Conjugation, Auxiliary, conjugateAuxiliary} = require('../index');
const test = require('tape');

test('check some type I (godan) conjugations', t => {
  t.equal(conjugateTypeI('買う', Conjugation.Negative), '買わ');
  t.equal(conjugateTypeI('買う', Conjugation.Conjunctive), '買い');
  t.equal(conjugateTypeI('買う', Conjugation.Te), '買って');
  t.equal(conjugateTypeI('行く', Conjugation.Te), '行って');
  t.equal(conjugateTypeI('いく', Conjugation.Te), 'いって');
  t.end();
});

test('check some type II (ichidan) conjugations', t => {
  t.equal(conjugateTypeII('食べる', Conjugation.Te), '食べて');
  t.equal(conjugateTypeII('食べる', Conjugation.Tari), '食べたり');
  t.equal(conjugateTypeII('見る', Conjugation.Volitional), '見よう');
  t.equal(conjugateTypeII('見る', Conjugation.Conditional), '見れ');
  t.equal(conjugateTypeII('見る', Conjugation.Imperative), '見ろ');
  t.end();
});

test('Make sure splitting Conditional/Imperative is functional for Type I', t => {
  t.equal(conjugateTypeI('泳ぐ', Conjugation.Conditional), '泳げ');
  t.equal(conjugateTypeI('泳ぐ', Conjugation.Imperative), '泳げ');
  t.equal(conjugateTypeI('泳ぐ', Conjugation.Volitional), '泳ご');
  t.end();
});

test('Kuru', t => {
  for (const fn of [conjugateTypeI, conjugateTypeII]) {
    t.equal(fn('くる', Conjugation.Negative), 'こ');
    t.equal(fn('来る', Conjugation.Negative), '来');
    t.equal(fn('くる', Conjugation.Tari), 'きたり');
    t.equal(fn('来る', Conjugation.Tari), '来たり');
  }
  t.end();
});

test('Suru', t => {
  for (const fn of [conjugateTypeI, conjugateTypeII]) {
    t.equal(fn('する', Conjugation.Negative), 'し');
    t.equal(fn('する', Conjugation.Tari), 'したり');
  }
  t.end();
});

test('Masu', t => {
  t.equal(conjugateAuxiliary('行く', Auxiliary.Masu, Conjugation.Negative), '行きません');
  t.equal(conjugateAuxiliary('行く', Auxiliary.Masu, Conjugation.Ta), '行きました');
  t.end();
});

test('Nai', t => {
  t.equal(conjugateAuxiliary('買う', Auxiliary.Nai, Conjugation.Dictionary), '買わない');
  t.equal(conjugateAuxiliary('買う', Auxiliary.Nai, Conjugation.Ta), '買わなかった');
  t.end();
});
