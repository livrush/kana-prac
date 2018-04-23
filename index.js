let alphabet = 'katakana';
const colors = pafiumeColors.random();
const colorDark = colors.hues[3];
const colorLight = colors.hues[1];

$(document).ready(function() {
  const name = gimei.name();
  const nameKatakana = name[alphabet]();
  $('body')
    .css({
      background: colorLight,
      color: colorLight,
    });
  $('.spinner')
    .css({
      color: colorDark,
    });

  createPracticeWord(alphabet, colorDark, colorLight);
  // kuroshiro.init((err) => {
  //   const splitName = nameKatakana.split('');
  //   const nameRomaji = kuroshiro.convert(nameKatakana, { to: 'romaji' })
  //   var romajiSyllables = splitName.map(kana => {
  //     return kuroshiro.convert(kana, { to: 'romaji' });
  //   });
  //   $('.switch-alphabet').click(function(event) {
  //     const $button = $(event.currentTarget);
  //     const type = $button.attr('id');
  //     alphabet = type;
  //     $('.switch-alphabet').removeClass('active');
  //     $(`#${type}`).addClass('active');
  //     swapLanguages(colorLight, colorDark);
  //     $('#type-alphabet').text(type.slice(0, 4).toUpperCase());
  //   });
  //   $('.spinner').toggle();
  //   $('.top')
  //     .css('background-color', colorDark)
  //     .toggle()
  //     .addClass('slide-open');
  //   swapLanguages(colorLight, colorDark);
  //   $('.bottom')
  //     .css('color', colorDark)
  //     .toggle();
  //   createTextInput(colorDark, nameKatakana, nameRomaji);
  // })
});

function createPracticeWord(type, colorDark, colorLight) {
  const name = gimei.name();
  const nameKatakana = name[type]();
  console.log(nameKatakana);
  $('#practice-text')
    .text(nameKatakana);
  kuroshiro.init((err) => {
    const splitName = nameKatakana.split('');
    const nameRomaji = kuroshiro.convert(nameKatakana, { to: 'romaji' })
    var romajiSyllables = splitName.map(kana => {
      return kuroshiro.convert(kana, { to: 'romaji' });
    });
    $('.switch-alphabet').click(function(event) {
      const $button = $(event.currentTarget);
      const type = $button.attr('id');
      alphabet = type;
      $('.switch-alphabet').removeClass('active');
      $(`#${type}`).addClass('active');
      swapLanguages(colorLight, colorDark);
      $('#type-alphabet').text(type.slice(0, 4).toUpperCase());
    });
    $('.spinner').hide();
    $('.top')
      .css('background-color', colorDark)
      .show()
      .addClass('slide-open');
    swapLanguages(colorLight, colorDark);
    $('.bottom')
      .css('color', colorDark)
      .show();
    createTextInput(colorDark, nameKatakana, nameRomaji);
  });
}

function createTextInput(color, nameKatakana, nameRomaji) {
  $('.user-input').remove();
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
          createPracticeWord(alphabet, colorDark, colorLight);
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
  const $attempt = $('<li>')
    .text(`${katakana} | ${romaji}`)
    .addClass('attempt new')
    .prependTo($attemptType);
  $attemptType.children().last().remove();
}

function swapLanguages(colorLight, colorDark) {
  $('.switch-alphabet')
  .css({
    color: colorLight,
    'border-color': colorLight,
    background: colorDark,
  });
  $('.switch-alphabet.active')
    .css({
      color: colorDark,
      background: colorLight,
    });
}