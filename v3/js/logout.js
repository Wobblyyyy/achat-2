_("$logout").on("click", function ()
{
  logout ();
});

function logout ()
{
  firebase.auth().signOut().then(function()
  {
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
        document.body.classList.add("fadeOut");
        window.location.href = "index.html";
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

setTimeout(function ()
{
  if (firebase.auth().currentUser == null)
  {
    window.location.href = "index.html";
  }
}, 1000);