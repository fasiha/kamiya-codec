"use strict";
const {conjugateTypeI, conjugateTypeII, conjugate, conjugateAuxiliaries} = require('../index');
const test = require('tape');

const has = (vec, key) => vec.indexOf(key) >= 0;

test('check some type I (godan) conjugations', t => {
  t.ok(has(conjugateTypeI('買う', 'Negative'), '買わ'));
  t.ok(has(conjugateTypeI('買う', 'Conjunctive'), '買い'));
  t.ok(has(conjugateTypeI('買う', 'Te'), '買って'));
  t.ok(has(conjugateTypeI('行く', 'Te'), '行って'));
  t.ok(has(conjugateTypeI('いく', 'Te'), 'いって'));
  t.ok(has(conjugateTypeI('話す', 'Ta'), '話した'));
  t.ok(has(conjugateTypeI('取る', 'Te'), '取って'));
  t.end();
});

test('check some type II (ichidan) conjugations', t => {
  t.ok(has(conjugateTypeII('食べる', 'Te'), '食べて'));
  t.ok(has(conjugateTypeII('食べる', 'Tari'), '食べたり'));
  t.ok(has(conjugateTypeII('見る', 'Volitional'), '見よう'));
  t.ok(has(conjugateTypeII('見る', 'Conditional'), '見れ'));
  t.ok(has(conjugateTypeII('見る', 'Imperative'), '見ろ'));
  t.end();
});

test('Make sure splitting Conditional/Imperative is functional for Type I', t => {
  t.ok(has(conjugateTypeI('泳ぐ', 'Conditional'), '泳げ'));
  t.ok(has(conjugateTypeI('泳ぐ', 'Imperative'), '泳げ'));
  t.ok(has(conjugateTypeI('泳ぐ', 'Volitional'), '泳ご'));
  t.end();
});

test('Kuru', t => {
  for (const fn of [conjugateTypeI, conjugateTypeII]) {
    t.ok(has(fn('くる', 'Negative'), 'こ'));
    t.ok(has(fn('来る', 'Negative'), '来'));
    t.ok(has(fn('くる', 'Tari'), 'きたり'));
    t.ok(has(fn('来る', 'Tari'), '来たり'));
    t.ok(has(fn('くる', 'Conditional'), 'くれ'));
    t.ok(has(fn('来る', 'Conditional'), '来れ'));
  }
  t.end();
});

test('Suru', t => {
  for (const fn of [conjugateTypeI, conjugateTypeII]) {
    t.ok(has(fn('する', 'Negative'), 'し'));
    t.ok(has(fn('する', 'Tari'), 'したり'));
  }
  t.end();
});

test('Masu', t => {
  t.ok(has(conjugateAuxiliaries('行く', ['Masu'], 'Negative'), '行きません'));
  t.ok(has(conjugateAuxiliaries('行く', ['Masu'], 'Ta'), '行きました'));
  t.end();
});

test('Nai', t => {
  t.ok(has(conjugateAuxiliaries('買う', ['Nai'], 'Dictionary'), '買わない'));
  t.ok(has(conjugateAuxiliaries('買う', ['Nai'], 'Ta'), '買わなかった'));
  t.end();
});

test('Tai', t => {
  t.ok(has(conjugateAuxiliaries('習う', ['Tai'], 'Dictionary'), '習いたい'));
  t.ok(has(conjugateAuxiliaries('習う', ['Tai'], 'Te'), '習いたくて'));
  t.end();
});

test('Tagaru', t => {
  t.ok(has(conjugateAuxiliaries('遊ぶ', ['Tagaru'], 'Negative'), '遊びたがら'));
  t.ok(has(conjugateAuxiliaries('遊ぶ', ['Tagaru'], 'Conjunctive'), '遊びたがり'));
  t.ok(has(conjugateAuxiliaries('遊ぶ', ['Tagaru'], 'Dictionary'), '遊びたがる'));
  t.ok(has(conjugateAuxiliaries('遊ぶ', ['Tagaru'], 'Te'), '遊びたがって'));
  t.ok(has(conjugateAuxiliaries('遊ぶ', ['Tagaru'], 'Ta'), '遊びたがった'));
  t.ok(has(conjugateAuxiliaries('遊ぶ', ['Tagaru'], 'Tara'), '遊びたがったら'));
  t.end();
});

test('Hoshii', t => {
  t.ok(has(conjugateAuxiliaries('見る', ['Hoshii'], 'Negative', true), '見てほしくない'));
  t.ok(has(conjugateAuxiliaries('見る', ['Hoshii'], 'Conjunctive', true), '見てほしく'));
  t.ok(has(conjugateAuxiliaries('見る', ['Hoshii'], 'Dictionary', true), '見てほしい'));
  t.ok(has(conjugateAuxiliaries('見る', ['Hoshii'], 'Conditional', true), '見てほしければ'));
  t.ok(has(conjugateAuxiliaries('見る', ['Hoshii'], 'Tara', true), '見てほしかったら'));
  t.end();
});

test('Rashii', t => {
  t.ok(has(conjugateAuxiliaries('帰る', ['Rashii'], 'Conjunctive'), '帰るらしく'));
  t.ok(has(conjugateAuxiliaries('帰る', ['Rashii'], 'Dictionary'), '帰るらしい'));
  t.ok(has(conjugateAuxiliaries('帰る', ['Rashii'], 'Te'), '帰るらしくて'));
  t.ok(has(conjugateAuxiliaries('帰る', ['Rashii'], 'Negative'), '帰らないらしい'));
  t.end();
});

test('Souda, both Hearsay and Conjecture', t => {
  let ret = conjugateAuxiliaries('来る', ['SoudaHearsay'], 'Dictionary');
  t.ok(has(ret, '来るそうだ'));
  t.ok(has(ret, '来たそうだ'));
  t.ok(has(conjugateAuxiliaries('倒れる', ['SoudaConjecture'], 'Dictionary', true), '倒れそうだ'));
  t.ok(has(conjugateAuxiliaries('倒れる', ['SoudaConjecture'], 'Conditional', true), '倒れそうなら'));
  t.ok(has(conjugateAuxiliaries('倒れる', ['SoudaConjecture'], 'Ta', true), '倒れそうだった'));
  t.ok(has(conjugateAuxiliaries('読む', ['Potential', 'SoudaConjecture'], 'Ta'), '読めそうでした'));
  t.end();
});

test('Saseru/seru', t => {
  t.ok(has(conjugateAuxiliaries('歩く', ['SeruSaseru'], 'Dictionary'), '歩かせる'));
  t.ok(has(conjugateAuxiliaries('歩く', ['SeruSaseru'], 'Negative'), '歩かせ'));
  t.ok(has(conjugateAuxiliaries('食べる', ['SeruSaseru'], 'Dictionary', true), '食べさせる'));
  t.ok(has(conjugateAuxiliaries('食べる', ['SeruSaseru'], 'Imperative', true), '食べさせろ'));
  t.ok(has(conjugateAuxiliaries('食べる', ['SeruSaseru'], 'Imperative', true), '食べさせよ'));
  t.ok(has(conjugateAuxiliaries('来る', ['SeruSaseru'], 'Dictionary'), '来させる'));
  t.ok(has(conjugateAuxiliaries('来る', ['SeruSaseru'], 'Conditional'), '来させれ'));
  t.ok(has(conjugateAuxiliaries('する', ['SeruSaseru'], 'Dictionary'), 'させる'));
  t.ok(has(conjugateAuxiliaries('する', ['SeruSaseru'], 'Volitional'), 'させよう'));
  t.end();
});

// See section 3.26 in Kamiya
test('Shortened causative seru', t => {
  t.ok(has(conjugateAuxiliaries('歩く', ['ShortenedCausative'], 'Dictionary'), '歩かす'));
  t.ok(has(conjugateAuxiliaries('食べる', ['ShortenedCausative'], 'Dictionary', true), '食べさす'));
  t.ok(has(conjugateAuxiliaries('来る', ['ShortenedCausative'], 'Dictionary'), '来さす'));
  t.ok(has(conjugateAuxiliaries('する', ['ShortenedCausative'], 'Dictionary'), 'さす'));
  t.end();
});

test('Rareru/reru', t => {
  t.ok(has(conjugateAuxiliaries('読む', ['ReruRareru'], 'Dictionary'), '読まれる'));
  t.ok(has(conjugateAuxiliaries('ほめる', ['ReruRareru'], 'Dictionary', true), 'ほめられる'));
  t.ok(has(conjugateAuxiliaries('来る', ['ReruRareru'], 'Dictionary'), '来られる'));
  t.ok(has(conjugateAuxiliaries('する', ['ReruRareru'], 'Dictionary'), 'される'));
  t.end();
});

test('Causative-passive', t => {
  t.ok(has(conjugateAuxiliaries('書く', ['CausativePassive'], 'Negative'), '書かせられ'));
  t.ok(has(conjugateAuxiliaries('書く', ['CausativePassive'], 'Conjunctive'), '書かせられ'));
  t.ok(has(conjugateAuxiliaries('書く', ['CausativePassive'], 'Dictionary'), '書かせられる'));
  t.ok(has(conjugateAuxiliaries('書く', ['CausativePassive'], 'Te'), '書かせられて'));
  t.ok(has(conjugateAuxiliaries('書く', ['CausativePassive'], 'Ta'), '書かせられた'));
  t.end();
});

test('Causative-passive', t => {
  t.ok(has(conjugateAuxiliaries('歩く', ['ShortenedCausativePassive'], 'Negative'), '歩かされ'));
  t.ok(has(conjugateAuxiliaries('歩く', ['ShortenedCausativePassive'], 'Conjunctive'), '歩かされ'));
  t.ok(has(conjugateAuxiliaries('歩く', ['ShortenedCausativePassive'], 'Dictionary'), '歩かされる'));
  t.ok(has(conjugateAuxiliaries('歩く', ['ShortenedCausativePassive'], 'Te'), '歩かされて'));
  t.ok(has(conjugateAuxiliaries('歩く', ['ShortenedCausativePassive'], 'Ta'), '歩かされた'));
  t.end();
});

test('Potential', t => {
  t.ok(has(conjugateAuxiliaries('書く', ['Potential'], 'Dictionary'), '書ける'));
  t.ok(has(conjugateAuxiliaries('読む', ['Potential'], 'Dictionary'), '読める'));
  t.ok(has(conjugateAuxiliaries('読む', ['Potential'], 'Negative'), '読め'));
  t.ok(has(conjugateAuxiliaries('読む', ['Potential'], 'Te'), '読めて'));

  // also check we add extra things like nai after Negative
  t.ok(has(conjugateAuxiliaries('離す', ['Potential'], 'Negative'), '離せない'));
  t.end();
});

test('Check that nai/masu/etc. multiple choice endings are there', t => {
  // v1 of this package was quite strict about returning a single string in an array, but we want to support
  // conjugations that can have more than one conjugation. Let's check some.
  t.ok(has(conjugateAuxiliaries('あるく', ['SeruSaseru'], 'Conjunctive'), 'あるかせます'));
  t.ok(has(conjugateAuxiliaries('あるく', ['SeruSaseru'], 'Conditional'), 'あるかせれば'));

  t.ok(has(conjugateAuxiliaries('食べる', ['SeruSaseru'], 'Negative', true), '食べさせない'));
  t.ok(has(conjugateAuxiliaries('食べる', ['SeruSaseru'], 'Conjunctive', true), '食べさせます'));
  t.ok(has(conjugateAuxiliaries('食べる', ['SeruSaseru'], 'Conditional', true), '食べさせれば'));

  t.ok(has(conjugateAuxiliaries('する', ['SeruSaseru'], 'Conditional'), 'させれば'));

  t.ok(has(conjugateAuxiliaries('いく', ['Masu'], 'Negative'), 'いきません'));
  t.ok(has(conjugateAuxiliaries('いく', ['Masu'], 'Negative'), 'いきませんでした'));

  t.ok(has(conjugate('くる', 'Negative'), 'こない'));
  t.ok(has(conjugate('食べる', 'Conditional', true), '食べれば'));
  t.ok(has(conjugate('買う', 'Negative'), '買わない'));

  t.end();
})