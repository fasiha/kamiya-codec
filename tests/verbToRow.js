"use strict";
const guessVerbToRow = require('../guessVerbToRow').guessVerbToRow;
const test = require('tape');

const kus = ["く", "書く　咲く　行く　働く　着く".split('　')];
const gus = ["ぐ", "泳ぐ　急ぐ　騒ぐ　脱ぐ".split('　')];
const sus = ["す", "話す　返す　直す　起こす".split('　')];
const tus = ["つ", "待つ　持つ　立つ　建つ　打つ　勝つ".split('　')];
const nus = ["ぬ", "死ぬ".split('　')];
const bus = ["ぶ", "飛ぶ　遊ぶ　運ぶ　選ぶ　学ぶ　呼ぶ".split('　')];
const mus = ["む", "読む　飲む　住む　頼む　休む　楽しむ".split('　')];
const rus = ["る", "取る　入る　走る　帰る　乗る　作る".split('　')];
const us = ["う", "買う　会う　言う　習う　歌う　使う".split('　')];
const irus = ["いる", "みる　きる　起きる".split('　')]; // 見る and 着る
const erus = ["える", "食べる　答える　見せる　開ける".split('　')];
const converted = ["える", "書ける　読める".split('　')];
const examples = [kus, gus, sus, tus, nus, bus, mus, rus, us, irus, erus, converted];

test('check type I (godan) and type II (ichidan) verbs', t => {
  for (const [key, verbs] of examples) {
    for (const verb of verbs) { t.equal(key, guessVerbToRow(verb)); }
  }
  t.end();
});
test('fail for nonsense', t => {
  t.throws(() => guessVerbToRow('blabla'));
  t.end();
})