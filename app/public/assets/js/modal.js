// JS for Log in Modal.
$("#modalLogin").on("click", function(event) {
    event.preventDefault();
    var login = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    };
    $.post("/api/login", login, function success(data) {
      if (data.valid === true){
      window.location = "/view";
      } else {
      alert("Invalid login credentials. Please try again.");
      }
    });
    
  });

$('#myFirstModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})