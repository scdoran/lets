// ------------ EVENT LISTENERS ------------ //
$( window ).on( "load", displayResults );
$("span.glyphicon-star").on("click", updateFriends);
$("#availableCheckbox").on("change", updateAvailability);


// ------------ FUNCTIONS ------------ //

// Update availability 
function updateAvailability() {
        if($(this).is(":checked")) {
            var availability = true;
            $(this).attr("checked", availability);
            console.log(availability);
            $.ajax({
               url: '/view',
               type: 'PUT',
               data: availability,
               success: function(status) {
                 console.log("Available.");
               }
            });
        }
        else {
            var availability = false;
            $(this).attr("checked", availability);
            console.log(availability);
            $.ajax({
               url: '/view',
               type: 'PUT',
               data: availability,
               success: function(status) {
                 console.log("No longer available");
               }
            });
        }        
};

// Display results of those within 20 miles, sorted by distance
function displayResults() {
    // Logic for determining within 20 miles
    $.get("/api/user", function(friends){
        console.log(friends);
    });
};

// Add / remove friends
function updateFriends() {
    if($(this).hasClass("favorited")) {
            var returnVal = console.log("Friend removed");
            $(this).removeClass("favorited", returnVal);
           
            $.delete("/api/friends/:UserId/:FriendId", {userId: user.id, friendIds: friendId}, function(friendRemoved){
                console.log("Friend removed!" + friendRemoved);
            });
        }
        else {
            var returnVal = console.log("Friend added");
            $(this).addClass("favorited", returnVal);

            $.post("/api/friends", friendIds, function(friendAdded){
                console.log("Friend added!" + friendAdded);
            });
        }   
};





