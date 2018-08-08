"use strict";
const {conjugate, Conjugation} = require('../index');
const test = require('tape');

test('check some conjugations', t => {
  t.equal(conjugate('買う', Conjugation.Negative), '買わ');
  t.equal(conjugate('買う', Conjugation.Conjunctive), '買い');
  t.equal(conjugate('買う', Conjugation.Te), '買って');
  t.equal(conjugate('行く', Conjugation.Te), '行って');
  t.equal(conjugate('いく', Conjugation.Te), 'いって');
  t.end();
})