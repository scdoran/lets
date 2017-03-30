// ------------ EVENT LISTENERS ------------ //
$( window ).on( "load", displayResults );
$("span.glyphicon-star").on("click", updateFriends);
$("#availableCheckbox").on("change", updateAvailability);


// ------------ FUNCTIONS ------------ //

// Update availability 
function updateAvailability() {
        if($(this).is(":checked")) {
            var returnVal = console.log("You are now available.");
            $(this).attr("checked", returnVal);
        }
        else {
            var returnVal = console.log("You are not available.");
            $(this).attr("checked", returnVal);
        }        
};

// Display results of those within 20 miles, sorted by distance
function displayResults() {
    // Logic for determining within 20 miles

};

// Add / remove friends
function updateFriends() {
    if($(this).hasClass("favorited")) {
            var returnVal = console.log("Friend removed");
            $(this).removeClass("favorited", returnVal);
        }
        else {
            var returnVal = console.log("Friend added");
            $(this).addClass("favorited", returnVal);
        }   
};





