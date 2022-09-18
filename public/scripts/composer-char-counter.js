$(document).ready(function() {
  // --- our code goes here ---
  // CREATE JQUERY VARIABLE FOR FORM INPUT
  const textBox = $('#tweet-text');
  // FUNCTION TO RUN ON INPUT EVENT
  $(textBox).on("input", function (evt) {
    // LENGTH OF CURRENT TEXT IN FORM INPUT
    let chars = $(this).val().length;
    // REMAINING CHARACTER LIMIT
    let charLimit = 140 - chars;
    // FIND COUNTER ELEMENT
    let counter = $(this).parent().next('div').children('.counter')
    // UPDATE COUNTER TEXT TO CURRENT CHAR LIMIT
    counter.text(charLimit);

    // RED TEXT IF CHARACTER LIMIT IS EXCEEDED
    if (charLimit < 0) {
      counter.addClass('text-color-red');
    } else if (charLimit >= 0) {
      counter.removeClass('text-color-red');
    }
  })
});

