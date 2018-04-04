# GifTastic!

This app accepts user input from a web form and makes use of the Giphy API to return 10 
related gifs, added to the top of the page.

# Key Code Blocks

## A Trivial Example of Intentional Programming
* File: giftastic.js

Observe the code below

'''javascript
    //Construct the query url
    var protocol = "https";     //Necessary for interoperability with github pages
    var limit = "&limit=10";    //Number of records that will be returned
    var baseURL = "://api.giphy.com/v1/gifs/search?";
    var apiKey = "uvfteKAe0MUv2PrOJDk9Jc4EfYMevLkO";
    var queryURL = protocol + baseURL + "q=" + searchTerm + "&api_key=" + apiKey + "&limit=" + limit;
'''

At first, it seems most intuitive to include "https" within the baseURL variable. However, using HTTPS happens to be
critical to this project (as it is hosted on GitHub pages). The goal in the above code block is to make it clear
to future programmers why https was chosen, either enforcing the past decision if the original rational remains,
or encouraging experimentation if it no longer applies.