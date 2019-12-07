var name = Cookies.get("username");

if (name !== "undefined" && name !== undefined)
{
  _("$un").prepend('<button sv="m' + name + '" class="w3-bar-item w3-button">Signed in as <b>' + name + '</b></button>');
  setTimeout(function ()
  {
    _("$controls").html('<span class="w3-large">you' + "'" + 're already signed in to an account.<br><b>details</b><br>email: ' + firebase.auth().currentUser.email + '<br>username: ' + name + '</span><br><button style="width: 25vw;" class="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off" onclick="homepage()">go to homepage</button>');
    _("$m" + name).on("click", function ()
    {
      Swal.fire(
      {
        title: "signed in as " + name,
        text: "email address: " + firebase.auth().currentUser.email,
      });
    });
  }, 1000);
}
else
{
  _("$un").prepend('<button sv="not" class="w3-bar-item w3-button">Not signed in</button>')
}

function homepage ()
{
  window.location.href = "../homepage.html";
}

var Buttons = 
[
  "login",
  "register",
  "logout",
];

Buttons.forEach(function (i)
{
  _("$nav").append('<button sv="' + i + '" class="w3-bar-item w3-button"> ' + i + '</button>');
});

_("$login").prepend('<i class="fa fa-sign-in"></i>');
_("$register").prepend('<i class="fa fa-user-plus"></i>');
_("$logout").prepend('<i class="fa fa-sign-out"></i>');

function assign ()
{
  Buttons.forEach(function (i)
  {
    _("$" + i).on("click", function ()
    {
      _("@").addClass("out");
      setTimeout(function ()
      {
        window.location.href = i + ".html";
      }, 2000);
    });
  });
}

assign ();