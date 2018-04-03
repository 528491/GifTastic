$(document).ready(function(){
    //It was noted in the write up that before any other code, we should have an array storing categories
    //that will serve as parts of our API queries, in addition to providing text for the buttons. That is done here.


    //Creating a function to return a query URL. As our app will be submitting requests with numerous URLs, 
    //it seems natural to use a function to enhance reusability and code modularity

    function returnQueryURL(searchTerm){
        //Returns a query URL for the Giphy API, using HTTPS as the protocol
        //HTTPS is chosen as the protocol for the sake of interoperability with 
        //github pages

        //Parameters:
        // - Search Term

        //Process the Search Term
        // 1) Remove any leading and trailing whitespace (trim)
        // 2) Take the search term and add "+" characters in lieu of spaces (.replace)
        searchTerm = $.trim(searchTerm);
        searchTerm = searchTerm.replace(/ /g, "+");     //Note - does not handle more one white space. Try regex or for loop

        //Construct the query url
        var protocol = "https";     //Necessary for interoperability with github pages
        var limit = "&limit=10";    //Number of records that will be returned
        var baseURL = "://api.giphy.com/v1/gifs/search?";
        var apiKey = "uvfteKAe0MUv2PrOJDk9Jc4EfYMevLkO";
        var queryURL = protocol + baseURL + "q=" + searchTerm + "&api_key=" + apiKey + "&limit=" + limit;

        return queryURL;
    };

    function addButton(buttonText){
        var newButton = $("<button>");
        newButton.attr("class", "gif-button"); //button class on click .attr()
        newButton.text(buttonText);
        $("#animalButtons").append(newButton);

    };

    function displayGIFsFromResponse(response){
        //Once we have the data from a response object, we are going to need to display it.
        //This function accomplishes this with the following nuances
        // 1) Elements are prepended
        // 2) image tags are created such that there is a link to a static and moving image url. Later code will make it such that
        //    clicking an image alternates between these two

        //Get the array of objects, each one containing various links to images
        var images = response.data;
        console.log(images);

        for (image in images){
            //Image Object whose attributes we will make use of
            var imageObject = images[image];

            //Create the div that we will inserting both the image and the rating into
            var imageDiv = $("<div>");
            imageDiv.attr("class", "imageDiv");

            //Append the rating while we're at it
            var ratingTag = $("<p>");
            ratingTag.text(imageObject.rating);
            imageDiv.append(ratingTag); 

            //Create the image element and add the necessary attributes
            var staticURL = imageObject.images.fixed_width_still.url;
            var animatedURL = imageObject.images.fixed_width.url;
            var imageTag = $("<img>");
            imageTag.attr("src", staticURL);    //Note that all images start off as stills
            imageTag.attr("static-url", staticURL);
            imageTag.attr("animated-url", animatedURL);
            imageTag.attr("class", "gif-image");
            imageTag.attr("state", "static");

            //Append the image to the div
            imageDiv.append(imageTag);
            //Prepend the div to the document
            $("#animals").prepend(imageDiv);
        }

        

    };



    $("#addAnimal").on("click", function(event){
        event.preventDefault();
        var searchTerm = $("#animalInput").val();
        addButton(searchTerm);
        var queryURL = returnQueryURL(searchTerm);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            displayGIFsFromResponse(response);
        });
        
        
    });

    //Event listener for images on click
    $("body").on("click", ".gif-image", function(){
        //console.log($(this).attr("state"));
        if ($(this).attr("state") == "static"){
            $(this).attr("src", $(this).attr("animated-url"));
            $(this).attr("state", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("static-url"));
            $(this).attr("state", "static");
        }
        
    });

    $("body").on("click", ".gif-button", function(){
        event.preventDefault();
        var searchTerm = $(this).text();
        var queryURL = returnQueryURL(searchTerm);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            displayGIFsFromResponse(response);
        });
    });


    
    

});