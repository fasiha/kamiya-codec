"use strict";
const {conjugateTypeI, conjugateTypeII, Conjugation, Auxiliary, conjugateAuxiliary} = require('../index');
const test = require('tape');

const has = (vec, key) => vec.indexOf(key) >= 0;

test('check some type I (godan) conjugations', t => {
  t.ok(has(conjugateTypeI('買う', Conjugation.Negative), '買わ'));
  t.ok(has(conjugateTypeI('買う', Conjugation.Conjunctive), '買い'));
  t.ok(has(conjugateTypeI('買う', Conjugation.Te), '買って'));
  t.ok(has(conjugateTypeI('行く', Conjugation.Te), '行って'));
  t.ok(has(conjugateTypeI('いく', Conjugation.Te), 'いって'));
  t.ok(has(conjugateTypeI('話す', Conjugation.Ta), '話した'));
  t.end();
});

test('check some type II (ichidan) conjugations', t => {
  t.ok(has(conjugateTypeII('食べる', Conjugation.Te), '食べて'));
  t.ok(has(conjugateTypeII('食べる', Conjugation.Tari), '食べたり'));
  t.ok(has(conjugateTypeII('見る', Conjugation.Volitional), '見よう'));
  t.ok(has(conjugateTypeII('見る', Conjugation.Conditional), '見れ'));
  t.ok(has(conjugateTypeII('見る', Conjugation.Imperative), '見ろ'));
  t.end();
});

test('Make sure splitting Conditional/Imperative is functional for Type I', t => {
  t.ok(has(conjugateTypeI('泳ぐ', Conjugation.Conditional), '泳げ'));
  t.ok(has(conjugateTypeI('泳ぐ', Conjugation.Imperative), '泳げ'));
  t.ok(has(conjugateTypeI('泳ぐ', Conjugation.Volitional), '泳ご'));
  t.end();
});

test('Kuru', t => {
  for (const fn of [conjugateTypeI, conjugateTypeII]) {
    t.ok(has(fn('くる', Conjugation.Negative), 'こ'));
    t.ok(has(fn('来る', Conjugation.Negative), '来'));
    t.ok(has(fn('くる', Conjugation.Tari), 'きたり'));
    t.ok(has(fn('来る', Conjugation.Tari), '来たり'));
    t.ok(has(fn('くる', Conjugation.Conditional), 'くれ'));
    t.ok(has(fn('来る', Conjugation.Conditional), '来れ'));
  }
  t.end();
});

test('Suru', t => {
  for (const fn of [conjugateTypeI, conjugateTypeII]) {
    t.ok(has(fn('する', Conjugation.Negative), 'し'));
    t.ok(has(fn('する', Conjugation.Tari), 'したり'));
  }
  t.end();
});

test('Masu', t => {
  t.ok(has(conjugateAuxiliary('行く', Auxiliary.Masu, Conjugation.Negative), '行きません'));
  t.ok(has(conjugateAuxiliary('行く', Auxiliary.Masu, Conjugation.Ta), '行きました'));
  t.end();
});

test('Nai', t => {
  t.ok(has(conjugateAuxiliary('買う', Auxiliary.Nai, Conjugation.Dictionary), '買わない'));
  t.ok(has(conjugateAuxiliary('買う', Auxiliary.Nai, Conjugation.Ta), '買わなかった'));
  t.end();
});

test('Tai', t => {
  t.ok(has(conjugateAuxiliary('習う', Auxiliary.Tai, Conjugation.Dictionary), '習いたい'));
  t.ok(has(conjugateAuxiliary('習う', Auxiliary.Tai, Conjugation.Te), '習いたくて'));
  t.end();
});

test('Tagaru', t => {
  t.ok(has(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Negative), '遊びたがら'));
  t.ok(has(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Conjunctive), '遊びたがり'));
  t.ok(has(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Dictionary), '遊びたがる'));
  t.ok(has(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Te), '遊びたがって'));
  t.ok(has(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Ta), '遊びたがった'));
  t.ok(has(conjugateAuxiliary('遊ぶ', Auxiliary.Tagaru, Conjugation.Tara), '遊びたがったら'));
  t.end();
});

test('Hoshii', t => {
  t.ok(has(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Negative, true), '見てほしくない'));
  t.ok(has(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Conjunctive, true), '見てほしく'));
  t.ok(has(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Dictionary, true), '見てほしい'));
  t.ok(has(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Conditional, true), '見てほしければ'));
  t.ok(has(conjugateAuxiliary('見る', Auxiliary.Hoshii, Conjugation.Tara, true), '見てほしかったら'));
  t.end();
});

test('Rashii', t => {
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Conjunctive), '帰るらしく'));
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Dictionary), '帰るらしい'));
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Te), '帰るらしくて'));
  t.ok(has(conjugateAuxiliary('帰る', Auxiliary.Rashii, Conjugation.Negative), '帰らないらしい'));
  t.end();
});

test('Souda, both Hearsay and Conjecture', t => {
  let ret = conjugateAuxiliary('来る', Auxiliary.SoudaHearsay, Conjugation.Dictionary);
  t.ok(has(ret, '来るそうだ'));
  t.ok(has(ret, '来たそうだ'));
  t.ok(has(conjugateAuxiliary('倒れる', Auxiliary.SoudaConjecture, Conjugation.Dictionary, true), '倒れそうだ'));
  t.ok(has(conjugateAuxiliary('倒れる', Auxiliary.SoudaConjecture, Conjugation.Conditional, true), '倒れそうなら'));
  t.ok(has(conjugateAuxiliary('倒れる', Auxiliary.SoudaConjecture, Conjugation.Ta, true), '倒れそうだった'));
  t.end();
});

test('Saseru/seru', t => {
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.SeruSaseru, Conjugation.Dictionary), '歩かせる'));
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.SeruSaseru, Conjugation.Negative), '歩かせ'));
  t.ok(has(conjugateAuxiliary('食べる', Auxiliary.SeruSaseru, Conjugation.Dictionary, true), '食べさせる'));
  t.ok(has(conjugateAuxiliary('食べる', Auxiliary.SeruSaseru, Conjugation.Imperative, true), '食べさせろ'));
  t.ok(has(conjugateAuxiliary('食べる', Auxiliary.SeruSaseru, Conjugation.Imperative, true), '食べさせよ'));
  t.ok(has(conjugateAuxiliary('来る', Auxiliary.SeruSaseru, Conjugation.Dictionary), '来させる'));
  t.ok(has(conjugateAuxiliary('来る', Auxiliary.SeruSaseru, Conjugation.Conditional), '来させれ'));
  t.ok(has(conjugateAuxiliary('する', Auxiliary.SeruSaseru, Conjugation.Dictionary), 'させる'));
  t.ok(has(conjugateAuxiliary('する', Auxiliary.SeruSaseru, Conjugation.Volitional), 'させよう'));
  t.end();
});

test('Shortened causative seru', t => {
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.ShortenedCausative, Conjugation.Dictionary), '歩かす'));
  t.ok(has(conjugateAuxiliary('食べる', Auxiliary.ShortenedCausative, Conjugation.Dictionary, true), '食べさす'));
  t.ok(has(conjugateAuxiliary('来る', Auxiliary.ShortenedCausative, Conjugation.Dictionary), '来さす'));
  t.ok(has(conjugateAuxiliary('する', Auxiliary.ShortenedCausative, Conjugation.Dictionary), 'さす'));
  t.end();
});

test('Rareru/reru', t => {
  t.ok(has(conjugateAuxiliary('読む', Auxiliary.ReruRareu, Conjugation.Dictionary), '読まれる'));
  t.ok(has(conjugateAuxiliary('ほめる', Auxiliary.ReruRareu, Conjugation.Dictionary, true), 'ほめられる'));
  t.ok(has(conjugateAuxiliary('来る', Auxiliary.ReruRareu, Conjugation.Dictionary), '来られる'));
  t.ok(has(conjugateAuxiliary('する', Auxiliary.ReruRareu, Conjugation.Dictionary), 'される'));
  t.end();
});

test('Causative-passive', t => {
  t.ok(has(conjugateAuxiliary('書く', Auxiliary.CausativePassive, Conjugation.Negative), '書かせられ'));
  t.ok(has(conjugateAuxiliary('書く', Auxiliary.CausativePassive, Conjugation.Conjunctive), '書かせられ'));
  t.ok(has(conjugateAuxiliary('書く', Auxiliary.CausativePassive, Conjugation.Dictionary), '書かせられる'));
  t.ok(has(conjugateAuxiliary('書く', Auxiliary.CausativePassive, Conjugation.Te), '書かせられて'));
  t.ok(has(conjugateAuxiliary('書く', Auxiliary.CausativePassive, Conjugation.Ta), '書かせられた'));
  t.end();
});

test('Causative-passive', t => {
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.ShortenedCausativePassive, Conjugation.Negative), '歩かされ'));
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.ShortenedCausativePassive, Conjugation.Conjunctive), '歩かされ'));
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.ShortenedCausativePassive, Conjugation.Dictionary), '歩かされる'));
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.ShortenedCausativePassive, Conjugation.Te), '歩かされて'));
  t.ok(has(conjugateAuxiliary('歩く', Auxiliary.ShortenedCausativePassive, Conjugation.Ta), '歩かされた'));
  t.end();
});

test('Potential', t => {
  t.ok(has(conjugateAuxiliary('書く', Auxiliary.Potential, Conjugation.Dictionary), '書ける'));
  t.ok(has(conjugateAuxiliary('読む', Auxiliary.Potential, Conjugation.Dictionary), '読める'));
  t.ok(has(conjugateAuxiliary('読む', Auxiliary.Potential, Conjugation.Negative), '読め'));
  t.ok(has(conjugateAuxiliary('読む', Auxiliary.Potential, Conjugation.Te), '読めて'));
  t.end();
});
