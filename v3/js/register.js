var username = "", request = false, db = firebase.database().ref();
var database =
{
  users: db.child("users"),
  count: db.child("users/count"),
  ute: db.child("name-to-email"),
  etu: db.child("email-to-name"),
}

function checkUsername ()
{
  var regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(_("$username").value()))
  {
    Alerts.error("username cannot contain special characters");
    return;
  }
  else if (_("$username").value().length > 20)
  {
    Alerts.error("username cannot be longer than 20 characters");
  }
  username = _("$username").value();
}

function checkDatabase ()
{
  if (_("$password").value() !== _("$confirm").value())
  {
    Alerts.error("passwords don't match");
    return;
  }
  if (_("$email").value().length < 1 || _("$username").value().length < 1 || _("$password").value().length < 1)
  {
    Alerts.error("all fields must be filled out");
    return;
  }
  if (request) return;
  var Info =
  {
    username: _("$username").value(),
    email: _("$email").value().replaceAll("@", "AtSign").replaceAll(".", "PeriodSign"),
    originalemail: _("$email").value(),
    password: _("$password").value()
  }
  database.users.once("value", function (snapshot)
  {
    if (snapshot.hasChild(Info.username))
    {
      Alerts.error("that username is already taken");
    }
    else
    {
      createAccount(Info);
    }
  })
}

function createAccount (Info)
{
  var Good = true;
  firebase.auth().createUserWithEmailAndPassword(Info.originalemail, Info.password).catch(function (error_)
  {
    Alerts.error(error_.code + " - " + error_.message);
    Good = false;
  });
  setTimeout(function ()
  {
    if (Good)
    {
      database.etu.child(Info.email).set(
      {
        username: Info.username,
      });
      database.ute.child(Info.username).set(
      {
        email: Info.email,
      });
      database.count.once("value", function (snapshot)
      {
        database.count.set(snapshot.val() + 1);
        database.users.child(Info.username).set(
        {
          id: snapshot.val() + 1,
          color: "black",
          tokens: 0,
        });
        Cookies.set("username", Info.username, { expires: 365 });
        setTimeout(function ()
        {
          Alerts.success("successfuly created account " + Info.username + "!");
        }, 200);
      });
    }
  }, 400);
}

_("$username").on("keypress", function (e)
{
  setTimeout(function ()
  {
    checkUsername();
    _("$username").value(username);
    if (e.key == "Enter")
    {
      checkDatabase();
      request = true;
    }
  }, 5)
});

var Inputs =
[
  "email",
  "password",
  "confirm",
];

Inputs.forEach(function (i)
{
  _("$" + i).on("keypress", function (e)
  {
    if (e.key == "Enter")
    {
      checkDatabase();
      request = true;
    }
  });
});

_("$create").click(function ()
{
  checkDatabase();
  request = true;
});
