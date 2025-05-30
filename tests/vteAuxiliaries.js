"use strict";
const { conjugateAuxiliaries } = require("../index");
const test = require("tape");

const a = conjugateAuxiliaries;

test("secondary aux", (t) => {
  t.ok(
    a("読む", ["Potential", "Masu"], "Ta", false).includes("読めました"),
    "potential/masu/ta",
  ); // page 31

  t.ok(
    a("する", ["Tagaru", "Masu"], "Ta", false).includes("したがりました"),
    "tagaru/masu/ta",
  ); // page 58, 1.11 sentence 3

  t.ok(
    a("あるく", ["SeruSaseru", "Masu"], "Ta", false).includes("あるかせました"),
    "seru/masu/ta",
  ); // page 41
  t.ok(
    a("食べる", ["SeruSaseru", "Masu"], "Ta", true).includes("食べさせました"),
    "ichidan seru/masu/ta",
  ); // page 42, table b
  t.ok(
    a("くる", ["SeruSaseru", "Masu"], "Ta", true).includes("こさせました"),
    "irregular seru/masu/ta",
  ); // page 42, table c
  t.ok(
    a("する", ["SeruSaseru", "Masu"], "Ta", true).includes("させました"),
    "suru seru/masu/ta",
  ); // page 43

  t.ok(
    a("読む", ["ReruRareru", "Masu"], "Ta", false).includes("読まれました"),
    "godan reru/masu/ta",
  ); // page 44
  t.ok(
    a("ほめる", ["ReruRareru", "Masu"], "Ta", true).includes("ほめられました"),
    "ichidan reru/masu/ta",
  ); // page 45
  t.ok(
    a("くる", ["ReruRareru", "Masu"], "Ta", true).includes("こられました"),
    "kuru reru/masu/ta",
  ); // page 45 table b
  t.ok(
    a("来る", ["ReruRareru", "Masu"], "Ta", true).includes("来られました"),
    "kuru/kanji reru/masu/ta",
  ); // page 45 table c
  t.ok(
    a("する", ["ReruRareru", "Masu"], "Ta", true).includes("されました"),
    "suru reru/masu/ta",
  ); // page 46

  t.ok(
    a("書く", ["CausativePassive", "Masu"], "Ta", false).includes(
      "書かせられました",
    ),
    "causative-passive/masu/ta",
  ); // page 47

  t.ok(
    a("歩く", ["ShortenedCausativePassive", "Masu"], "Ta", false).includes(
      "歩かされました",
    ),
    "shortened/masu/ta",
  ); // page 47

  t.ok(
    a("買う", ["Ageru", "Masu"], "Ta", false).includes("買ってあげました"),
    "ageru masu/ta",
  ); // p 162
  t.ok(
    a("見せる", ["Sashiageru", "Masu"], "Ta", true).includes(
      "見せて差し上げました",
    ),
    "Sashiageru kanji masu/ta",
  ); // p 162
  t.ok(
    a("する", ["Yaru", "Masu"], "Ta", false).includes("してやりました"),
    "yaru kanji masu/ta",
  ); // p 162

  t.ok(
    a("する", ["Morau", "Masu"], "Ta", false).includes("してもらいました"),
    "morau masu/ta",
  ); // p 163
  t.ok(
    a("おしえる", ["Itadaku", "Masu"], "Dictionary", true).includes(
      "おしえていただきます",
    ),
    "itadaku",
  ); // p 163

  t.ok(
    a("知らせる", ["Kureru", "Masu"], "Ta", true).includes(
      "知らせてくれました",
    ),
    "kureru",
  ); // p 164
  t.ok(
    a("する", ["Kudasaru", "Masu"], "Ta", true).includes("してくださいました"),
    "kudaseru",
  ); // p 164

  //   // p 169-170
  t.ok(
    a("飲む", ["Miru", "Masu"], "Ta", false).includes("飲んでみました"),
    "miru/masu/ta",
  );
  t.ok(
    a("こえる", ["Miru", "Masu"], "Dictionary", true).includes("こえてみます"),
    "miru/masu/dict",
  );
  t.ok(
    a("こえる", ["Miru", "Masu"], "Dictionary", true).includes("こえてみます"),
    "miru/masu/dict",
  );

  // p 170
  t.ok(
    a("逃げる", ["Iku", "Masu"], "Ta", true).includes("逃げていきました"),
    "iku/masu/ta",
  );

  // p 171
  t.ok(
    a("吹く", ["Kuru", "Masu"], "Ta", false).includes("吹いてきました"),
    "kuru/masu/ta",
  );
  t.ok(
    a("流れる", ["Kuru", "Masu"], "Ta", true).includes("流れてきました"),
    "kuru/masu/ta",
  );
  t.ok(
    a("する", ["Kuru", "Masu"], "Ta", true).includes("してきました"),
    "kuru/masu/ta",
  );
  t.ok(a("やる", ["Kuru"], "Ta", false).includes("やってきた"));

  // p 171-172
  t.ok(a("調べる", ["Oku", "Masu"], "Ta", true).includes("調べておきました"));
  t.ok(
    a("する", ["Oku", "Masu"], "Volitional", true).includes("しておきましょう"),
  );

  // p 172
  t.ok(
    a("話す", ["Shimau", "Masu"], "Ta", false).includes("話してしまいました"),
  );
  t.ok(
    a("やめる", ["Shimau", "Masu"], "Ta", true).includes("やめてしまいました"),
  );
  t.ok(
    a("する", ["Shimau", "Masu"], "Volitional", true).includes(
      "してしまいましょう",
    ),
  );

  t.end();
});

test("vte auxiliaries", (t) => {
  t.ok(a("洗う", ["Morau"], "Dictionary").includes("洗ってもらう"), "morau"); // p 163
  t.ok(a("焼く", ["Kureru"], "Dictionary").includes("焼いてくれる"), "kureru"); // p 163

  // p167-8
  t.ok(a("たつ", ["TeIru"], "Dictionary").includes("たっている"), "teiru");
  t.ok(a("する", ["TeAru"], "Dictionary").includes("してある"), "tearu");

  t.ok(a("飛ぶ", ["Iku"], "Dictionary").includes("飛んでいく"), "Iku"); // p 170

  // p 171-172
  t.ok(a("買う", ["Oku"], "Dictionary").includes("買っておく"));

  t.end();
});

test("Oku -> toku", (t) => {
  {
    // see https://japanese.stackexchange.com/q/18157
    const v = a("する", ["Oku"], "Dictionary");
    t.ok(v.includes("しとく"));
    t.ok(v.includes("しておく"));
  }
  {
    // rendaku (teku to deku)
    const v = a("汲む", ["Oku"], "Dictionary");
    t.ok(v.includes("汲んでおく"));
    t.ok(v.includes("汲んどく")); // see https://bunpro.jp/grammar_points/%E3%81%A6%E3%81%8A%E3%81%8F
  }
  t.ok(a("やめる", ["Oku"], "Ta", true).includes("やめといた"));
  t.end();
});

test("Iku -> teku/deku", (t) => {
  {
    // see https://jisho.org/word/%E3%81%A6%E3%81%8F
    const v = a("食べる", ["Iku"], "Dictionary", true);
    t.ok(v.includes("食べていく"));
    t.ok(v.includes("食べてく"));
  }
  {
    // rendaku: teku -> deku
    const v = a("読む", ["Iku"], "Dictionary");
    t.ok(v.includes("読んでいく"));
    console.log(v);
    t.ok(v.includes("読んでく"));
  }
  t.end();
});

test("multi-pipeline", (t) => {
  // 知る -> SeruSaseru -> Kureru -> Masu -> Ta, page 164
  t.ok(
    a("知る", ["SeruSaseru", "Kureru", "Masu"], "Ta", false).includes(
      "知らせてくれました",
    ),
  ); // p 164

  t.end();
});

test("vte iru/aru", (t) => {
  // p 151-152
  t.ok(a("歌う", ["TeIru"], "Dictionary", false).includes("歌っている"));
  t.ok(
    a("書く", ["SeruSaseru", "TeIru", "Masu"], "Dictionary", false).includes(
      "書かせています",
    ),
  );
  t.ok(
    a("する", ["TeIru", "Masu"], "Dictionary", false).includes("しています"),
  );

  // p 153
  t.ok(
    a("使う", ["TeAru", "Masu"], "Dictionary", false).includes(
      "使ってあります",
    ),
  );
  t.ok(a("閉める", ["TeAru"], "Dictionary", true).includes("閉めてある"));
  t.ok(
    a("する", ["TeAru", "Masu"], "Dictionary", false).includes("してあります"),
  );

  t.end();
});

test("vte oru", (t) => {
  t.ok(a("まつ", ["TeOru", "Masu"], "Ta").includes("まっておりました"));
  t.end();
});

test("nai+te", (t) => {
  const res = a("食べる", ["Nai"], "Te", true);
  t.ok(res.includes("食べなくて"));
  t.ok(res.includes("食べないで"));
  t.end();
});

test("teru", (t) => {
  const res = a("知る", ["TeIru"], "Dictionary");
  t.ok(res.includes("知っている"));
  t.ok(res.includes("知ってる"));
  t.end();
});

test("shimau abbreviations", (t) => {
  {
    const res = a("負ける", ["Shimau"], "Ta", true);
    t.ok(res.includes("負けてしまった"));
    t.ok(res.includes("負けちゃった"));
    t.ok(res.includes("負けちまった"));
  }
  {
    const res = a("死ぬ", ["Shimau"], "Imperative");
    t.ok(res.includes("死んでしまえ"));
    t.ok(res.includes("死んじまえ"));
  }
  t.end();
});
