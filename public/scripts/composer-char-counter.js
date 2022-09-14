// $(document).ready(function() {
//   // --- our code goes here ---
//   console.log('doc ready')
// });


$(document).ready(function() {
  // --- our code goes here ---
  const textBox = $('#tweet-text');
  $(textBox).on("input", function (evt) {
    let chars = $(this).val().length;
    let remaining = 140 - chars;
    console.log(remaining);
  })
});

