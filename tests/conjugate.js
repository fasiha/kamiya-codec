"use strict";
const {conjugateTypeI, conjugateTypeII, Conjugation} = require('../index');
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
  t.end();
})