"use strict";
const {conjugate, verbDeconjugate} = require('../index');
const test = require('tape');

test('zu', t => {
  t.ok(conjugate('食べる', 'Zu', true).includes('食べず'))
  t.ok(conjugate('いく', 'Zu').includes('いかず'))
  t.ok(conjugate('する', 'Zu').includes('せず'))
  t.ok(conjugate('くる', 'Zu').includes('こず'))
  t.ok(conjugate('来る', 'Zu').includes('来ず'))
  t.end();
});

test('deconj', t => {
  t.ok(verbDeconjugate('食べず', '食べる', true).length > 0)
  t.ok(verbDeconjugate('いかず', 'いく').length > 0)
  t.ok(verbDeconjugate('せず', 'する').length > 0)
  t.ok(verbDeconjugate('こず', 'くる').length > 0)
  t.ok(verbDeconjugate('来ず', '来る').length > 0)
  t.end();
});