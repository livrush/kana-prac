const address = gimei.address();
const addressKatakana = address.katakana();

console.log(addressKatakana);

const splitAddress = addressKatakana.split('');

kuroshiro.init((err) => {
  var romajiSyllables = splitAddress.map(kana => {
    return kuroshiro.convert(kana, { to: 'romaji' });
  });
  console.log(romajiSyllables.join(' '));
});