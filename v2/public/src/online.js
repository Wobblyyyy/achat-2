function Online () {}

Online.url = new URL (window.location.href);
Online.conversation = Online.url.searchParams.get("c");
Online.username = Cookies.get("username");

var db = firebase.database().ref("conversations/" + Online.conversation);
var database =
{
  online: db.child("online"),
  user: db.child("online/" + Online.username),
}

database.online.on("value", function (snapshot)
{
  _("$list").html("");
  snapshot.forEach(function (child)
  {
    switch (child.val())
    {
      case "typing":
        _("$list").append('<p><b><i>' + child.key + '</i></b></p>');
        break;
      case "active":
        _("$list").append('<p><b>' + child.key + '</b></p>');
        break;
      case "online":
        _("$list").append('<p>' + child.key + '</p>');
        break;
    }
  });
});