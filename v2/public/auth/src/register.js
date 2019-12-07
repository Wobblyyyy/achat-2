String.prototype.replaceAll = function(t, i)
{
  return this.split(t).join(i)
};

var username = "";
var db = firebase.database().ref();
var database = 
{
  users: db.child("users"),
  count: db.child("users/count"),
  ute: db.child("name-to-email"),
  etu: db.child("email-to-name")
}

function error(message)
{
  Swal.fire(
  {
    icon: "error",
    title: "error",
    text: message
  });
}

function success (message)
{
  Swal.fire(
  {
    icon: "success",
    title: "success",
    text: message,
    confirmButtonText: "go to my homepage"
  }).then((result) =>
  {
    if (result.value)
    {
      console.log("hey it worked");
    }
  });
}

function checkUsername()
{
  var regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(_("$username").value()))
  {
    error("username can not contain special characters");
    return;
  }
  else if (_("$username").value().length > 20)
  {
    error("username can not be longer than 20 characters");
    return;
  }
  username = _("$username").value();
}

function databaseCheck()
{
  if (_("$password").value() !== _("$confirm").value())
  {
    error("passwords do not match");
    return;
  }
  if (_("$email").value().length < 1 || _("$username").value().length < 1 || _("$password").value().length < 1)
  {
    error("all fields must be filled out");
    return;
  }
  var Info = {
    username: _("$username").value(),
    email: _("$email").value().replaceAll("@", "AtSign").replaceAll(".", "PeriodSign"),
    originalemail: _("$email").value(),
    password: _("$password").value()
  }
  database.users.once("value", function(snapshot)
  {
    if (snapshot.hasChild(Info.username))
    {
      Swal.fire(
      {
        icon: "error",
        title: "error",
        text: "that username is already taken"
      });
    }
    else
    {
      createAccount(Info);
    }
  });
}

function createAccount(Info)
{
  var Good = true;
  firebase.auth().createUserWithEmailAndPassword(Info.originalemail, Info.password).catch(function(error_)
  {
    error(error_.code + " - " + error_.message);
    Good = false;
  });
  setTimeout(function()
  {
    if (Good)
    {
      database.etu.child(Info.email).set(
      {
        username: Info.username
      });
      database.ute.child(Info.username).set(
      {
        email: Info.email
      });
      database.count.once("value", function(snapshot)
      {
        database.count.set(snapshot.val() + 1);
        database.users.child(Info.username).set(
        {
          id: snapshot.val() + 1,
          color: "black",
          tokens: 0
        });
      });
      Cookies.set("username", Info.username, {expires: 365});
      setTimeout(function()
      {
        success("successfuly created account " + Info.username + "!");
      }, 200);
    }
  }, 400);
}

_("$username").on("keypress", function (e)
{
  setTimeout(function()
  {
    checkUsername();
    _("$username").value(username);
    if (e.key == "Enter")
    {
      databaseCheck();
    }
  }, 5);
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
      databaseCheck();
    }
  });
});

_("$create").click(function()
{
  databaseCheck();
});