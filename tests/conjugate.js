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

test('Tai', t => {
  t.equal(conjugateAuxiliary('習う', Auxiliary.Tai, Conjugation.Dictionary), '習いたい');
  t.equal(conjugateAuxiliary('習う', Auxiliary.Tai, Conjugation.Te), '習いたくて');
  t.end();
});

test('Tagaru', t => {
  t.equal(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Negative), '遊びたがら');
  t.equal(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Conjunctive), '遊びたがり');
  t.equal(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Dictionary), '遊びたがる');
  t.equal(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Te), '遊びたがって');
  t.equal(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Ta), '遊びたがった');
  t.equal(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Tara), '遊びたがったら');
  t.end();
});

test('Hoshii', t => {
  t.equal(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Negative, true), '見てほしくない');
  t.equal(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Conjunctive, true), '見てほしく');
  t.equal(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Dictionary, true), '見てほしい');
  t.equal(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Conditional, true), '見てほしければ');
  t.equal(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Tara, true), '見てほしかったら');
  t.end();
});

test('Rashii', t => {
  const has = (vec, key) => vec.indexOf(key) >= 0;
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Conjunctive), '帰るらしく'));
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Dictionary), '帰るらしい'));
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Te), '帰るらしくて'));
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Negative), '帰らないらしい'));
  t.end();
});
