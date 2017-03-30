
// Reset fields
$(".clear").on("click", clear);

function clear() {
    $("#email").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    $("#phone").val("");
    $("#photo").val("");
    $("#city").val("");
    $("#state").val("");
    $('#activities :checked').removeAttr('checked');
    $("#facebook").val("");
    $("#instagram").val("");
};



// Validate and submit
$('#myForm').validator().on('submit', function (e) {
  
  
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
    console.log("Invalid form entries");
  } else {
    
    e.preventDefault();

    // if everything looks good
      // This is an array and function that loops through & stores interests
      var allInterests = [];
          $("input[type='checkbox']:checked").each(function() {
            allInterests.push($(this).val());
          });

       var newUser = {
          name: $("#name").val().trim(),
          email: $("#email").val().trim(),
          password: $("#password").val().trim(),
          phone: $("#phone").val().trim(),
          city: $("#city").val().trim(),
          state: $("#state").val().trim(),
          interests: allInterests
        };
        console.log(newUser)

        var newSocial = $("#facebook").val().trim() + "," + $("#instagram").val().trim();

      $.post("/api/user", newUser, function(user){
        console.log("Posted user!");
        console.log(user.id);
        var fd = new FormData(document.getElementById("myForm"));
           //fd.append("label", "WEBUPLOAD");
        fd.append("UserId", user.id);
        console.log(fd);
           $.ajax({
             url: "/newUpload/image",
             type: "POST",
             data: fd,
             processData: false,  // tell jQuery not to process the data
             contentType: false   // tell jQuery not to set contentType
           }).done(function( data ) {
               console.log( data );
           });
        $.post("/api/usersocial", {UserId: user.id, links: newSocial}, function(dbSocial){
          console.log(dbSocial);
        });
        $.post("/api/useractivities", {UserId: user.id, ActivityIds: allInterests}, function(dbSocial){
          console.log(dbSocial);
        });
        
      }).then(function() {
        console.log("done");
      });

      };
});