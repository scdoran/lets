
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
    // if everything looks good
      console.log("Success");
      // This is an array and function that loops through & stores interests
      var allInterests = [];
      collectInterests();
      function collectInterests() {        
          $("input[type='checkbox']:checked").each(function() {
            allInterests.push($(this).val());
          });
      console.log("interests " + allInterests);
      };
    
      var newUser = {
          email: $("#email").val().trim(),
          password: $("#password").val().trim(),
          phone: $("#phone").val().trim(),
          photo: $("#photo").val().trim(),
          city: $("#city").val().trim(),
          state: $("#state").val().trim(),
          interests: allInterests
      };
      console.log(newUser);

    $.post("/api/user", newUser)
      .done(function(data) {
        console.log(data.user.id);
        alert("Adding user...");
      });

      var newSocial = {
        facebook: $("#facebook").val().trim(),
        instagram: $("#instagram").val().trim()
      }

    $.post("/api/usersocial", newSocial)
    .done(function(data) {
      console.log(data);
    });
  };
});

// facebook: $("#facebook").val().trim(),
// instagram: $("#instagram").val().trim()

// $("input[type='checkbox']:checked").each(function ( index, item) {console.log(item.value)});