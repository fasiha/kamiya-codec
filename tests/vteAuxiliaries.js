"use strict";
const {conjugateAuxiliary} = require('../index');
const test = require('tape');
const tape = require('tape');

test('secondary aux', t => {
  t.ok(conjugateAuxiliary('読む', 'Potential', 'Ta', false, {secondaryAux: 'Masu'}).includes('読めました'),
       'potential/masu/ta'); // page 31

  t.ok(conjugateAuxiliary('する', 'Tagaru', 'Ta', false, {secondaryAux: 'Masu'}).includes('したがりました'),
       'tagaru/masu/ta'); // page 58, 1.11 sentence 3

  t.ok(conjugateAuxiliary('あるく', 'SeruSaseru', 'Ta', false, {secondaryAux: 'Masu'}).includes('あるかせました'),
       'seru/masu/ta'); // page 41
  t.ok(conjugateAuxiliary('食べる', 'SeruSaseru', 'Ta', true, {secondaryAux: 'Masu'}).includes('食べさせました'),
       'ichidan seru/masu/ta'); // page 42, table b
  t.ok(conjugateAuxiliary('くる', 'SeruSaseru', 'Ta', true, {secondaryAux: 'Masu'}).includes('こさせました'),
       'irregular seru/masu/ta'); // page 42, table c
  t.ok(conjugateAuxiliary('する', 'SeruSaseru', 'Ta', true, {secondaryAux: 'Masu'}).includes('させました'),
       'suru seru/masu/ta'); // page 43

  t.ok(conjugateAuxiliary('読む', 'ReruRareu', 'Ta', false, {secondaryAux: 'Masu'}).includes('読まれました'),
       'godan reru/masu/ta'); // page 44
  t.ok(conjugateAuxiliary('ほめる', 'ReruRareu', 'Ta', true, {secondaryAux: 'Masu'}).includes('ほめられました'),
       'ichidan reru/masu/ta'); // page 45
  t.ok(conjugateAuxiliary('くる', 'ReruRareu', 'Ta', true, {secondaryAux: 'Masu'}).includes('こられました'),
       'kuru reru/masu/ta'); // page 45 table b
  t.ok(conjugateAuxiliary('来る', 'ReruRareu', 'Ta', true, {secondaryAux: 'Masu'}).includes('来られました'),
       'kuru/kanji reru/masu/ta'); // page 45 table c
  t.ok(conjugateAuxiliary('する', 'ReruRareu', 'Ta', true, {secondaryAux: 'Masu'}).includes('されました'),
       'suru reru/masu/ta'); // page 46

  t.ok(conjugateAuxiliary('書く', 'CausativePassive', 'Ta', false, {secondaryAux: 'Masu'}).includes('書かせられました'),
       'causative-passive/masu/ta'); // page 47
  t.ok(conjugateAuxiliary('歩く', 'ShortenedCausativePassive', 'Ta', false, {
         secondaryAux: 'Masu'
       }).includes('歩かされました'),
       'shortened/masu/ta'); // page 47

  t.ok(conjugateAuxiliary('買う', 'Ageru', 'Ta', false, {secondaryAux: 'Masu'}).includes('買ってあげました'),
       'ageru masu/ta'); // p 162
  t.ok(conjugateAuxiliary('見せる', 'Sashiageru', 'Ta', true, {secondaryAux: 'Masu'}).includes('見せて差し上げました'),
       'Sashiageru kanji masu/ta'); // p 162
  t.ok(conjugateAuxiliary('する', 'Yaru', 'Ta', false, {secondaryAux: 'Masu'}).includes('してやりました'),
       'yaru kanji masu/ta'); // p 162

  t.ok(conjugateAuxiliary('する', 'Morau', 'Ta', false, {secondaryAux: 'Masu'}).includes('してもらいました'),
       'morau masu/ta'); // p 163
  t.ok(conjugateAuxiliary('おしえる', 'Itadaku', 'Dictionary', true, {
         secondaryAux: 'Masu'
       }).includes('おしえていただきます'),
       'itadaku'); // p 163

  // FIXME: this is actually  知る -> SeruSaseru -> Kureru -> Masu -> Ta
  t.ok(conjugateAuxiliary('知らせる', 'Kureru', 'Ta', true, {secondaryAux: 'Masu'}).includes('知らせてくれました'),
       'kureru'); // p 164
  t.ok(conjugateAuxiliary('する', 'Kudasaru', 'Ta', true, {secondaryAux: 'Masu'}).includes('してくださいました'),
       'kudaseru'); // p 164

  t.end();
});

tape('vte auxiliaries', t => {
  t.ok(conjugateAuxiliary('洗う', 'Morau', 'Dictionary').includes('洗ってもらう'),
       'morau'); // p 163
  t.ok(conjugateAuxiliary('焼く', 'Kureru', 'Dictionary').includes('焼いてくれる'),
       'kureru'); // p 163

  t.end();
});