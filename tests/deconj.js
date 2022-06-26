"use strict";
const {verbDeconjugate} = require('../index');
const test = require('tape');

test('just deconjugate', t => {
  // same as some tests for the conjugator
  t.ok(verbDeconjugate('あるかせます', 'あるく').length > 0);
  t.ok(verbDeconjugate('あるかせれば', 'あるく').length > 0);

  t.ok(verbDeconjugate('食べさせない', '食べる', true).length > 0);
  t.ok(verbDeconjugate('食べさせます', '食べる', true).length > 0);
  t.ok(verbDeconjugate('食べさせれば', '食べる', true).length > 0);

  t.ok(verbDeconjugate('させれば', 'する').length > 0);

  t.ok(verbDeconjugate('いきません', 'いく').length > 0);
  t.ok(verbDeconjugate('いきませんでした', 'いく').length > 0);

  t.ok(verbDeconjugate('こない', 'くる').length > 0);
  t.ok(verbDeconjugate('食べれば', '食べる', true).length > 0);
  t.ok(verbDeconjugate('買わない', '買う').length > 0);

  t.end();
});