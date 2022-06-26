"use strict";
const {adjConjugate, adjDeconjugate} = require('../index');
const test = require('tape');

test('na adj', t => {
  t.ok(adjConjugate('静か', 'Prenomial', false).includes('静かな'));
  t.ok(adjConjugate('静か', 'Present', false).includes('静かだ'));
  t.ok(adjConjugate('静か', 'Negative', false).includes('静かじゃない'));
  t.ok(adjConjugate('静か', 'Past', false).includes('静かだった'));
  t.ok(adjConjugate('静か', 'NegativePast', false).includes('静かじゃなかった'));
  t.ok(adjConjugate('静か', 'ConjunctiveTe', false).includes('静かで'));
  t.ok(adjConjugate('静か', 'Adverbial', false).includes('静かに'));
  t.ok(adjConjugate('静か', 'Conditional', false).includes('静かならば'));
  t.ok(adjConjugate('静か', 'TaraConditional', false).includes('静かだったら'));
  t.ok(adjConjugate('静か', 'Tari', false).includes('静かだったり'));
  t.ok(adjConjugate('静か', 'Noun', false).includes('静かさ'));
  t.end();
});

test('na adj deconj', t => {
  t.ok(adjDeconjugate('静かな', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かだ', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かじゃない', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かだった', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かじゃなかった', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かで', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かに', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かならば', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かだったら', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かだったり', '静か', false).length > 0);
  t.ok(adjDeconjugate('静かさ', '静か', false).length > 0);

  t.end();
})

test('i adj', t => {
  t.ok(adjConjugate('さむい', 'Prenomial', true).includes('さむい'))
  t.ok(adjConjugate('さむい', 'Present', true).includes('さむい'))
  t.ok(adjConjugate('さむい', 'Negative', true).includes('さむくない'))
  t.ok(adjConjugate('さむい', 'Past', true).includes('さむかった'))
  t.ok(adjConjugate('さむい', 'NegativePast', true).includes('さむくなかった'))
  t.ok(adjConjugate('さむい', 'ConjunctiveTe', true).includes('さむく'))
  t.ok(adjConjugate('さむい', 'ConjunctiveTe', true).includes('さむくて'))
  t.ok(adjConjugate('さむい', 'Adverbial', true).includes('さむく'))
  t.ok(adjConjugate('さむい', 'Conditional', true).includes('さむければ'))
  t.ok(adjConjugate('さむい', 'TaraConditional', true).includes('さむかったら'))
  t.ok(adjConjugate('さむい', 'Tari', true).includes('さむかったり'))
  t.ok(adjConjugate('さむい', 'Noun', true).includes('さむさ'))
  t.end();
});

test('i adj deconj', t => {
  t.ok(adjDeconjugate('さむい', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむい', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむくない', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむかった', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむくなかった', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむく', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむくて', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむく', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむければ', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむかったら', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむかったり', 'さむい', true).length > 0);
  t.ok(adjDeconjugate('さむさ', 'さむい', true).length > 0);

  t.end();
});