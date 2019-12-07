_("$logout").on("click", function ()
{
  logout ();
});

function logout ()
{
  firebase.auth().signOut().then(function()
  {
    _("$m" + Cookies.get("username")).html("");
    _("$un").prepend('<button class="w3-bar-item w3-button">Not signed in</button>');
    assign ();
    Cookies.remove("username");
    Swal.fire(
    {
      icon: "success",
      title: "success",
      text: "successfully signed out of your account",
      confirmButtonText: "go home",
    }).then((result) =>
    {
      if (result.value)
      {
        console.log("hey it worked");
      }
    });
  }, function (error)
  {
    Swal.fire(
    {
      icon: "error",
      title: "error",
      text: error.code + " - " + error.message,
      confirmButtonText: "try again",
    }).then((result) =>
    {
      if (result.value)
      {
        
      }
    });
  });
}