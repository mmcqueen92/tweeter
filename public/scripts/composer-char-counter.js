// $(document).ready(function() {
//   // --- our code goes here ---
//   console.log('doc ready')
// });


$(document).ready(function() {
  // --- our code goes here ---
  const textBox = $('#tweet-text');
  $(textBox).on("input", function (evt) {
    let chars = $(this).val().length;
    let charLimit = 140 - chars;
    let counter = $(this).parent().next('div').children('.counter')
    counter.text(charLimit);
  })
});

