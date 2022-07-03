"use strict";
const {conjugateAuxiliaries} = require('../index');
const test = require('tape');

const a = conjugateAuxiliaries;

test('secondary aux', t => {
  t.ok(a('読む', ['Potential', 'Masu'], 'Ta', false).includes('読めました'),
       'potential/masu/ta'); // page 31

  t.ok(a('する', ['Tagaru', 'Masu'], 'Ta', false).includes('したがりました'),
       'tagaru/masu/ta'); // page 58, 1.11 sentence 3

  t.ok(a('あるく', ['SeruSaseru', 'Masu'], 'Ta', false).includes('あるかせました'),
       'seru/masu/ta'); // page 41
  t.ok(a('食べる', ['SeruSaseru', 'Masu'], 'Ta', true).includes('食べさせました'),
       'ichidan seru/masu/ta'); // page 42, table b
  t.ok(a('くる', ['SeruSaseru', 'Masu'], 'Ta', true).includes('こさせました'),
       'irregular seru/masu/ta'); // page 42, table c
  t.ok(a('する', ['SeruSaseru', 'Masu'], 'Ta', true).includes('させました'),
       'suru seru/masu/ta'); // page 43

  t.ok(a('読む', ['ReruRareu', 'Masu'], 'Ta', false).includes('読まれました'),
       'godan reru/masu/ta'); // page 44
  t.ok(a('ほめる', ['ReruRareu', 'Masu'], 'Ta', true).includes('ほめられました'),
       'ichidan reru/masu/ta'); // page 45
  t.ok(a('くる', ['ReruRareu', 'Masu'], 'Ta', true).includes('こられました'),
       'kuru reru/masu/ta'); // page 45 table b
  t.ok(a('来る', ['ReruRareu', 'Masu'], 'Ta', true).includes('来られました'),
       'kuru/kanji reru/masu/ta'); // page 45 table c
  t.ok(a('する', ['ReruRareu', 'Masu'], 'Ta', true).includes('されました'),
       'suru reru/masu/ta'); // page 46

  t.ok(a('書く', ['CausativePassive', 'Masu'], 'Ta', false).includes('書かせられました'),
       'causative-passive/masu/ta'); // page 47

  t.ok(a('歩く', ['ShortenedCausativePassive', 'Masu'], 'Ta', false).includes('歩かされました'),
       'shortened/masu/ta'); // page 47

  t.ok(a('買う', ['Ageru', 'Masu'], 'Ta', false).includes('買ってあげました'),
       'ageru masu/ta'); // p 162
  t.ok(a('見せる', ['Sashiageru', 'Masu'], 'Ta', true).includes('見せて差し上げました'),
       'Sashiageru kanji masu/ta'); // p 162
  t.ok(a('する', ['Yaru', 'Masu'], 'Ta', false).includes('してやりました'),
       'yaru kanji masu/ta'); // p 162

  t.ok(a('する', ['Morau', 'Masu'], 'Ta', false).includes('してもらいました'),
       'morau masu/ta'); // p 163
  t.ok(a('おしえる', ['Itadaku', 'Masu'], 'Dictionary', true).includes('おしえていただきます'),
       'itadaku'); // p 163

  t.ok(a('知らせる', ['Kureru', 'Masu'], 'Ta', true).includes('知らせてくれました'),
       'kureru'); // p 164
  t.ok(a('する', ['Kudasaru', 'Masu'], 'Ta', true).includes('してくださいました'),
       'kudaseru'); // p 164

  //   // p 169-170
  t.ok(a('飲む', ['Miru', 'Masu'], 'Ta', false).includes('飲んでみました'), 'miru/masu/ta');
  t.ok(a('こえる', ['Miru', 'Masu'], 'Dictionary', true).includes('こえてみます'), 'miru/masu/dict');
  t.ok(a('こえる', ['Miru', 'Masu'], 'Dictionary', true).includes('こえてみます'), 'miru/masu/dict');

  // p 170
  t.ok(a('逃げる', ['Iku', 'Masu'], 'Ta', true).includes('逃げていきました'), 'iku/masu/ta');

  // p 171
  t.ok(a('吹く', ['Kuru', 'Masu'], 'Ta', false).includes('吹いてきました'), 'kuru/masu/ta');
  t.ok(a('流れる', ['Kuru', 'Masu'], 'Ta', true).includes('流れてきました'), 'kuru/masu/ta');
  t.ok(a('する', ['Kuru', 'Masu'], 'Ta', true).includes('してきました'), 'kuru/masu/ta');

  // p 171-172
  t.ok(a('調べる', ['Oku', 'Masu'], 'Ta', true).includes('調べておきました'));
  t.ok(a('する', ['Oku', 'Masu'], 'Volitional', true).includes('しておきましょう'));

  // p 172
  t.ok(a('話す', ['Shimau', 'Masu'], 'Ta', false).includes('話してしまいました'));
  t.ok(a('やめる', ['Shimau', 'Masu'], 'Ta', true).includes('やめてしまいました'));
  t.ok(a('する', ['Shimau', 'Masu'], 'Volitional', true).includes('してしまいましょう'));

  t.end();
});

test('vte auxiliaries', t => {
  t.ok(a('洗う', ['Morau'], 'Dictionary').includes('洗ってもらう'),
       'morau'); // p 163
  t.ok(a('焼く', ['Kureru'], 'Dictionary').includes('焼いてくれる'),
       'kureru'); // p 163

  // p167-8
  t.ok(a('たつ', ['TeIruNoun'], 'Dictionary').includes('たっている'), 'teiru');
  t.ok(a('する', ['TeAruNoun'], 'Dictionary').includes('してある'), 'tearu');

  t.ok(a('飛ぶ', ['Iku'], 'Dictionary').includes('飛んでいく'), 'Iku'); // p 170

  // p 171-172
  t.ok(a('買う', ['Oku'], 'Dictionary').includes('買っておく'));

  t.end();
});

test('multi-pipeline', t => {
  // 知る -> SeruSaseru -> Kureru -> Masu -> Ta, page 164
  t.ok(a('知る', ['SeruSaseru', 'Kureru', 'Masu'], 'Ta', false).includes('知らせてくれました')); // p 164

  t.end();
});
