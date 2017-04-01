// ------------ EVENT LISTENERS ------------ //
// $( window ).on( "load", displayResults );
$("span.glyphicon-star").on("click", updateFriends);
$("#availableCheckbox").on("change", updateAvailability);
$("#updateLocation").on("click", updateLocation);


// ------------ FUNCTIONS ------------ //
var foundLatitude;
var foundLongitude;

var userLocation = $.getJSON("http://freegeoip.net/json/", function(data) {
  foundLatitude = data.latitude;
  foundLongitude = data.longitude;
  console.log("Latitude: " + foundLatitude);
  console.log("Longitude: " + foundLongitude);
});

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
               data: {availability: availability},
               success: function(status) {
                 console.log("No longer available");
               }
            });
        }        
};

// // Display results of those within 20 miles, sorted by distance
    // Logic for determining within 20 miles
  

// Add / remove friends
function updateFriends() {
    if($(this).hasClass("favorited")) {
            var returnVal = console.log("Friend removed");
            $(this).removeClass("favorited", returnVal);
            var friend = $(this).data("id");
           
            // $.delete("/api/friends/:FriendId", {FriendId: friend}, function(friendRemoved){
            //     console.log("Friend removed!" + friendRemoved);
            // });
        }
        else {
            var returnVal = console.log("Friend added");
            $(this).addClass("favorited", returnVal);
            var friend = $(this).data("id");

            // $.post("/api/friends/:FriendId", {FriendId: friend}, function(friendAdded){
            //     console.log("Friend added!" + friendAdded);
            // });
        }   
};

function updateLocation() {
   console.log("Getting location...");
  console.log("Latitude: " + foundLatitude);
  console.log("Longitude: " + foundLongitude);
   // Simpler way to do it
       $.ajax({
               url: '/view',
               type: 'PUT',
               data: {latitude: foundLatitude, longitude: foundLongitude},
               success: function(location) {
                 console.log("You've updated your location.");
                 console.log(location);
               }
            });
};