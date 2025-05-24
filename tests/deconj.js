"use strict";
const { verbDeconjugate } = require("../index");
const test = require("tape");

test("just deconjugate", (t) => {
  // same as some tests for the conjugator
  t.ok(verbDeconjugate("あるかせます", "あるく").length > 0);
  t.ok(verbDeconjugate("あるかせれば", "あるく").length > 0);

  t.ok(verbDeconjugate("食べさせない", "食べる", true).length > 0);
  t.ok(verbDeconjugate("食べさせます", "食べる", true).length > 0);
  t.ok(verbDeconjugate("食べさせれば", "食べる", true).length > 0);

  t.ok(verbDeconjugate("させれば", "する").length > 0);

  t.ok(verbDeconjugate("いきません", "いく").length > 0);
  t.ok(verbDeconjugate("いきませんでした", "いく").length > 0);

  t.ok(verbDeconjugate("こない", "くる").length > 0);
  t.ok(verbDeconjugate("食べれば", "食べる", true).length > 0);
  t.ok(verbDeconjugate("買わない", "買う").length > 0);

  t.end();
});

test("deconj pipeline", (t) => {
  t.ok(verbDeconjugate("知らせてくれました", "知る").length > 0);
  t.ok(verbDeconjugate("知らせてくれました", "知る", false, 1).length === 0);
  t.ok(verbDeconjugate("知らせてくれました", "知る", false, 2).length === 0);

  t.ok(verbDeconjugate("歌っている", "歌う", false).length > 0);
  t.ok(verbDeconjugate("書かせています", "書く", false).length > 0);
  t.ok(verbDeconjugate("しています", "する", false).length > 0);

  // p 153
  t.ok(verbDeconjugate("使ってあります", "使う", false).length > 0);
  t.ok(verbDeconjugate("閉めてある", "閉める", true).length > 0);
  t.ok(verbDeconjugate("してあります", "する", false).length > 0);

  t.ok(verbDeconjugate("まっておりました", "まつ", false).length > 0);

  t.ok(verbDeconjugate("食べないで", "食べる", true).length > 0);

  t.ok(verbDeconjugate("死んじまえ", "死ぬ").length > 0);

  t.ok(verbDeconjugate("読めそうです", "読む").length > 0);
  t.ok(verbDeconjugate("読めそうでした", "読む").length > 0);

  // my own test
  t.ok(verbDeconjugate("慕われている", "慕う").length > 0);
  t.ok(verbDeconjugate("離せない", "離す").length > 0);

  t.end();
});

test("more deconj", (t) => {
  t.ok(verbDeconjugate("してもらいたい", "する").length > 0);
  t.ok(verbDeconjugate("かいていただけませ", "かく").length > 0);

  // allow ReruRareru + Nai + Conjunctive
  t.ok(verbDeconjugate("おさえられなく", "おさえる", true).length > 0);

  t.ok(verbDeconjugate("させてやる", "する").length > 0);

  t.end();
});
