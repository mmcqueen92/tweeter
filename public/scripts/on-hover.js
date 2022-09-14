$(document).ready(function() {
  // --- our code goes here ---
  const tweetArticle = $('.tweet-article');
  $(tweetArticle).hover(function (evt) {
    let JQtweetArticle = $(tweetArticle);
    JQtweetArticle.addClass('has-box-shadow')
  }, () => {
    let JQtweetArticle = $(tweetArticle);
    JQtweetArticle.removeClass('has-box-shadow')
  })
});

$(document).ready(function() {
  // --- our code goes here ---
  const icon1 = $('.icon1');
  $(icon1).hover(function (evt) {
    let JQicon1 = $(icon1);
    JQicon1.addClass('icon-hover')
  }, () => {
    let JQicon1 = $(icon1);
    JQicon1.removeClass('icon-hover')
  })
});

$(document).ready(function() {
  // --- our code goes here ---
  const icon2 = $('.icon2');
  $(icon2).hover(function (evt) {
    let JQicon2 = $(icon2);
    JQicon2.addClass('icon-hover')
  }, () => {
    let JQicon2 = $(icon2);
    JQicon2.removeClass('icon-hover')
  })
});

$(document).ready(function() {
  // --- our code goes here ---
  const icon3 = $('.icon3');
  $(icon3).hover(function (evt) {
    let JQicon3 = $(icon3);
    JQicon3.addClass('icon-hover')
  }, () => {
    let JQicon3 = $(icon3);
    JQicon3.removeClass('icon-hover')
  })
});