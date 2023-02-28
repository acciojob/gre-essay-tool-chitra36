"use strict";
var input = document.querySelectorAll('textarea')[0],
  wordCount = document.querySelector('#wordCount'),
  topKeywords = document.querySelector('#topKeywords');

// updating the displayed stats after every keypress
input.addEventListener('keyup', function() {
  console.clear();
 var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
  // console.log(words);
  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }
   if (words) {

    // step-1: removing all the stop words
    var nonStopWords = [];
    
    for (var i = 0; i < words.length; i++) {
      // filtering out stop words and numbers
      if (stopWords.indexOf(words[i].toLowerCase()) === -1 && isNaN(words[i])) {
        nonStopWords.push(words[i].toLowerCase());
      }
    }
    // console.log(nonStopWords);

    // step-2: forming an object with keywords and their count
    var keywords = {};
    for (var i = 0; i < nonStopWords.length; i++) {
      // checking if the word(property) already exists
      // if it does increment the count otherwise set it to one
      if (nonStopWords[i] in keywords) {
        keywords[nonStopWords[i]] += 1;
      } else {
        keywords[nonStopWords[i]] = 1;
      }
    }

    // step-3: sorting the object by first converting it to a 2D array
    var sortedKeywords = [];
    for (var keyword in keywords) {
      sortedKeywords.push([keyword, keywords[keyword]])
    }
    sortedKeywords.sort(function(a, b) {
      return b[1] - a[1]
    });
    // console.log(sortedKeywords);

    
    topKeywords.innerHTML = "";
    for (var i = 0; i < sortedKeywords.length && i < 4; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
      topKeywords.appendChild(li);
    }
  }

  
});

readability.addEventListener('click', function() {

  readability.innerHTML = "Fetching score...";

  var requestUrl = "https://ipeirotis-readability-metrics.p.mashape.com/getReadabilityMetrics?text=";
  var data = input.value;

  var request = new XMLHttpRequest();
  request.open('POST', encodeURI(requestUrl + data), true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader("X-Mashape-Authorization", "PQ4FOFuaR6mshI6qpnQKQvkDZQXjp1o6Zcqjsnug7GvNggTzUE");
  request.send();


});