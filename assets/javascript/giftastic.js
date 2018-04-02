
//It was noted in the write up that before any other code, we should have an array storing categories
//that will serve as parts of our API queries, in addition to providing text for the buttons. That is done here.


//Creating a function to return a query URL. As our app will be submitting requests with numerous URLs, 
//it seems natural to use a function to enhance reusability and code modularity

function returnQueryURL(){
    //Returns a query URL for the Giphy API, using HTTPS as the protocol
    //HTTPS is chosen as the protocol for the sake of interoperability with 
    //github pages

    var protocol = "https";     //Necessary for interoperability with github pages
    var baseURL;
    var apiKey = "uvfteKAe0MUv2PrOJDk9Jc4EfYMevLkO";
    var queryURL;
};

$(document).ready(function(){
    
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });

});