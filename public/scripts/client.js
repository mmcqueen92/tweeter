/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const $tweetContainer = $('.tweet-container');
  const $errorContainer = $('.error-container')
  const $form = $('.new-tweet-form');
  
    // CLICK ON "WRITE NEW TWEET" FOCUS SHIFT TO FORM //
  
    $(".writeNewTweet").click(function () {
      $(".tweet-input").focus();
    });

// ESCAPE FUNCTION

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // CREATE POSTED TWEET FUNCTION

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

  // CREATE ERROR ELEMENT FUNCTION

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

  // LOOP THROUGH DATABASE AND ADD TWEET ELEMENTS TO TWEET CONTAINER

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

  // LOAD TWEETS

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((getResponse) => {
        renderTweet(getResponse);
      })
  }


  

  $form.submit(function (event) {
    event.preventDefault();
    $('.error-slider').slideUp("slow");

    let errorFunction = () => {

      const serializedData = $form.serialize();


      // FIND VALUE OF TEXT AREA IN THE NEW TWEET FORM

      const tweetContent = $(this).children().find('textarea').val();

      if (!tweetContent) {

        // EMPTY ERROR CONTAINER
        $errorContainer.empty();

        // CREATE RELEVANT errMsg
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

        // CLEAR NEW TWEET FORM
        $('.new-tweet-form')[0].reset();
        
        // RESET CHAR COUNTER
        let counter = $(this).children().find('output')
        counter.text('140');

        // POST NEW TWEET TO DB
        $.post('/tweets', serializedData).then(() => {
          
          //RELOAD TWEETS WITH NEW TWEET ADDED
          loadTweets()
        })
      }
    }
    // RUN THE NEWLY CREATED FUNCTION
    errorFunction();
  })
  // INITIAL LOAD TWEETS
  loadTweets();
});