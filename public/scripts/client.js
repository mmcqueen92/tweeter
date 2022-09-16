/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  console.log('document loaded');

  const $tweetContainer = $('.tweet-container');
  const $errorContainer = $('.error-container')

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    const date = tweet.created_at;
    let timePassedSince = timeago.format(date);
    let $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="tweet-header-left">
          <div class="header-element">
            <img class="pic" src=${escape(tweet.user.avatars)}>
          
          </div>
          <div class="header-element">${escape(tweet.user.name)}</div>
        </div>
        <div class="header-element">${escape(tweet.user.handle)}</div>
      </header>

      <div class="tweet-body">${escape(tweet.content.text)}</div>

      <footer>
       <div class="date-posted">${escape(timePassedSince)}</div>
        <div class="icons">
          <i class="fa-regular fa-flag icon icon1"></i>
          <i class="fa-solid fa-retweet icon icon2"></i>
          <i class="fa-regular fa-heart icon icon3"></i>
        </div>
      </footer>

    </article>
    `);
    return $tweet;
  }

  const createErrorElement = (errorMsg) => {

    let $errorContent = $(`
          <div class="error-slider">
            <div class="error-message">
              <i class="fa-sharp fa-solid fa-triangle-exclamation"></i>
              <h4>${errorMsg}</h4>
              <i class="fa-sharp fa-solid fa-triangle-exclamation"></i>
            </div>
           </div>
        `)

    return $errorContent;
  };

  const renderTweet = (tweets) => {
    // empties tweet-container
    $tweetContainer.empty();

    // calls createTweetElement for each tweet
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)

      // takes return value and appends it to the tweets container
      $tweetContainer.prepend($tweet);
    }
  };


  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((getResponse) => {
        renderTweet(getResponse);
      })
  }


  const $form = $('.new-tweet-form');

  $form.submit(function (event) {
    event.preventDefault();
    $('.error-slider').slideUp("slow");
    let errorFunction = () => {

      const serializedData = $form.serialize();

      const tweetContent = $(this).children().find('textarea').val();

      
      if (!tweetContent) {
        // EMPTY TWEET
        console.log("error happened")


        // EMPTY ERROR CONTAINER
        $errorContainer.empty();

        // CREATE RELEVANT errObj
        let errMsg = "Error: Tweet cannot be empty.";

        // CALL createErrorElement(errMsg)
        const $error = createErrorElement(errMsg)

        // CHANGE ERROR-CONTAINER CONTENT TO RELEVANT ERROR MESSAGE
        $errorContainer.append($error);

        // SLIDEDOWN ERROR MESSAGE
        $('.error-slider').slideDown("slow");

        
      } else if (tweetContent.length > 140) {
        // CHARACTER LIMIT EXCEEDED

        $errorContainer.empty();
        let errMsg = "Error: Character limit exceeded.";
        const $error = createErrorElement(errMsg)
        $errorContainer.append($error);
        $('.error-slider').slideDown("slow");

        
      } else if (tweetContent && tweetContent.length <= 140) {
        //HAPPY PATH

        $.post('/tweets', serializedData);
        loadTweets();
      }




    }
    errorFunction();
  })


  loadTweets();



});

// $(document).ready(function() {
//   // --- our code goes here ---
//   const icon1 = $('.icon1');
//   const $hiddenElement = $('.hiddenElement')
//   $hiddenElement.
//   $(icon1).hover(function (evt) {
//     let JQicon1 = $(icon1);
//     JQicon1.addClass('icon-hover')
//   }, () => {
//     let JQicon1 = $(icon1);
//     JQicon1.removeClass('icon-hover')
//   })
// });