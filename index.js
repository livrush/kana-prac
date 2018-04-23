$(document).ready(function() {
  console.log('ready');
  const name = gimei.name();
  const nameKatakana = name.katakana();
  const colors = pafiumeColors.random();
  const colorDark = colors.hues[3];
  const colorLight = colors.hues[1];
  $('#user-input').toggle();
  $('body')
    .css({
      background: colorLight,
      color: colorLight,
    });
  $('.bottom')
    .css({
      color: colorDark,
    });
  $('.spinner')
    .css({
      color: colorDark,
    });
  $('#practice-text')
    .text(nameKatakana);


  kuroshiro.init((err) => {
    const splitName = nameKatakana.split('');
    const nameRomaji = kuroshiro.convert(nameKatakana, { to: 'romaji' })
    var romajiSyllables = splitName.map(kana => {
      return kuroshiro.convert(kana, { to: 'romaji' });
    });
    $('.spinner').toggle();
    $('#user-input').toggle();
    $('.top')
      .css('background-color', colorDark)
      .addClass('slide-open');
    createTextInput(colorDark, nameKatakana, nameRomaji);
  })
});

function createTextInput(color, nameKatakana, nameRomaji) {
  let failures = 0;
  const $practiceInput = $('<input>')
    .addClass('user-input text-english text-med')
    .css({
      color: color,
      'border-bottom': `${color} 3px solid`,
    })
    // .attr('placeholder', 'Practice Here')
    .keyup((event) => {
      const $event = $(event.currentTarget);
      if (event.keyCode === 13) {
        const userInput = $event.val();
        const userWasCorrect = userInput.toLowerCase() === nameRomaji.toLowerCase()
        createUserStatusIcon(userWasCorrect);
        if (userWasCorrect) {
          console.log('Great!');
        } else if (!userWasCorrect && failures < 4) {
          $event.val('');
          console.error('Try again!');
          failures++;
          createAttempt('failure', nameKatakana, nameRomaji);
        } else {
          console.log('Good try! It was:', nameRomaji);
          failures = 0;
        }

      }
    })
    .appendTo('#user-input')
    .focus();
}

function createUserStatusIcon(status) {
  const $status = $('#attempt-status');
  const $icon = $('<i>').addClass('fas');
  if (status) {
    $icon.addClass('fa-thumbs-up');
  } else {
    $icon.addClass('fa-thumbs-down');
  }
  $status.empty().append($icon);
}

function createAttempt(type, katakana, romaji) {

}