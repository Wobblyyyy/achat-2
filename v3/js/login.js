var Inputs =
[
  "email",
  "password",
];

Inputs.forEach(function (i)
{
  _("$" + i).on("keypress", function (e)
  {
    if (e.key == "Enter")
    {
      signIn ();
    }
  });
});

_("$login").on("click", function ()
{
  signIn ();
});

function signIn ()
{
  var Info = 
  {
    email: _("$email").value().replaceAll("@", "AtSign").replaceAll(".", "PeriodSign"),
    originalemail: _("$email").value(),
    password: _("$password").value(),
  };
  firebase.auth().signInWithEmailAndPassword(Info.originalemail, Info.password).then(function ()
  {
    firebase.database().ref("email-to-name/" + Info.email + "/username").once("value", function (snapshot)
    {
      _("$not").remove();
      _("$un").prepend('<button sv="m' + snapshot.val() + '" class="w3-bar-item w3-button">Signed in as <b>' + snapshot.val() + '</b></button>');
      assign ();
      Cookies.set("username", snapshot.val(), {expires: 365});
    });
    Swal.fire(
    {
      icon: "success",
      title: "success",
      text: "logged in to account " + Info.originalemail,
      confirmButtonText: "go to my homepage",
    }).then((result) =>
    {
      if (result.value)
      {
        _("@").addClass("out");
        setTimeout(function ()
        {
          window.location.href = "../homepage.html";
        }, 2000);
      }
    });
  }).catch(function (error)
  {
    Swal.fire(
    {
      icon: "error",
      title: "error",
      text: error.code + " - " + error.message,
    });
  });
}