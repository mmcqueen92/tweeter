/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  console.log('document loaded');

  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const createTweetElement = (tweet) => {
    let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-header-left">
          <div class="profPic">${tweet.user.avatars}</div>
          <div class="userName">${tweet.user.name}</div>
        </div>
        <div class="handle">${tweet.user.handle}</div>
      </header>

      <div class="tweet-body">${tweet.content.text}</div>

      <footer>
       <div class="date-posted">${tweet.user.avatars}</div>
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

  console.log($tweet); // to see what it looks like

  $('.tweet-container').append($tweet);

});