$(document).ready(function() {
  console.log('ready');
  const name = gimei.name();
  const nameKatakana = name.katakana();
  const colors = pafiumeColors.random();
  const colorDark = colors.hues[3];
  const colorLight = colors.hues[1];
  $('body')
    .css({
      background: colorLight,
      color: colorLight,
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
    $('.top')
      .css('background-color', colorDark)
      .toggle()
      .addClass('slide-open');
    $('.bottom')
      .css('color', colorDark)
      .toggle();
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
      const userInput = $event.val();
      if (event.keyCode === 13 && userInput) {
        const userWasCorrect = userInput.toLowerCase() === nameRomaji.toLowerCase()
        createUserStatusIcon(userWasCorrect);
        if (userWasCorrect) {
          console.log('Great!');
          createAttempt('success', nameKatakana, nameRomaji);
        } else if (!userWasCorrect && failures < 4) {
          $event.val('');
          console.error('Try again!');
          failures++;
          createAttempt('failure', nameKatakana, userInput);
        } else {
          console.log('Good try! It was:', nameRomaji);
          createAttempt('failure', nameKatakana, userInput);
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
  const $attemptType = $(`#attempt-${type}`);
  $attemptType.children().each(function (index, child) {
    const $original = $(child);
    const $clone = $original.clone(true);
    $clone.removeClass('new').addClass('old');
    $original.replaceWith($clone);
  })
    // .removeClass('old')
    // .removeClass('new')
    // .addClass('old');
  const $attempt = $('<li>')
    .text(`${katakana} | ${romaji}`)
    .addClass('attempt new')
    .prependTo($attemptType);
  $attemptType.children().last().remove();
}