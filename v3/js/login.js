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
      assign ();
      Cookies.set("username", snapshot.val(), {expires: 365});
    });
    Alerts.success("logged in to account " + Info.originalemail);
  }).catch(function (error)
  {
    Alerts.error(error.code + " - " + error.message);
  });
}