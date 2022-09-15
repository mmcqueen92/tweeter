/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  console.log('document loaded');

  const $tweetContainer = $('.tweet-container');

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

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
      <header>
        <div class="tweet-header-left">
          <div class="header-element">${escape(tweet.user.avatars)}</div>
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

  const renderTweet = (tweets) => {
    // loops through tweets
    $tweetContainer.empty();
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)
      $tweetContainer.prepend($tweet);
    }
    // takes return value and appends it to the tweets container
  };


  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((getResponse) => {
        renderTweet(getResponse);
      })
  }

  
  const $form = $('.new-tweet-form');

  $form.submit(function(event) {
    event.preventDefault();
    
    const serializedData = $form.serialize();

    const tweetContent = $(this).children().find('textarea').val();

    if (!tweetContent) {
      return alert('Tweet must be more than 0 characters.');
    } else if (tweetContent.length > 140) {
      return alert('Character limit exceeded.');
    } else if (tweetContent && tweetContent.length <=140 ) {
      $.post('/tweets', serializedData, (response) => {
        console.log('response: ', response);
      })
      loadTweets();
    }
  })
  


  loadTweets();
  
  
  
});