_("$Chat_Textbox").on("keypress", function (key)
{
  if (key.key === "Enter")
  {
    uploadMessage(_("$Chat_Textbox").value());
    _("$Chat_Textbox").value("");
  }
});
_("$Chat_Textbox").on("input", function ()
{
  if (_("$Chat_Textbox").value().length > 0)
  {
    Chat.focus = "typing";
  }
  else
  {
    Chat.focus = "active";
  }
});

function Chat () {}

Chat.url = new URLSearchParams(document.location.search);
Chat.focus = "active";
Chat.username = Cookies.get("username");
Chat.id = Chat.url.get("c");
Chat.color = 1;
Chat.userId = 1;
Chat.maxMsgs = 50;

firebase.database().ref("conversations/" + Chat.id + "/count").on("value", function (snapshot)
{
  setTimeout(function ()
  {
    if (Chat.focus == "online")
    {
      // Online
    }
    else
    {
      // Active
    }
  }, 1);
  var Time,
      Username,
      Message,
      Color,
      Usertag,
      Count = snapshot.val();
  firebase.database().ref("conversations/" + Chat.id + "/" + Count).once("value", function (snapshot)
  {
    var snap = snapshot.val();
    Time = snap.timestamp;
    Username = snap.username;
    Message = snap.message;
    Color = snap.color;
    Usertag = snap.usertag;
    printMessage(Message, Time, Username, Color, Usertag, Count);
  });
});

function uploadMessage (contents)
{
  contents = fixMessage(contents.trim().replaceAll("<", "<i></i><<i></i>"));
  if (contents.length >= 1)
  {
    var Time = new Date();
    var Timestamp =
    [
      Time.getHours(),
      Time.getMinutes().toString(),
    ];
    if (Timestamp[1].length == 1) Timestamp[1] = "0" + Timestamp[1];
    if (Timestamp[0] > 12) Timestamp[0] = Timestamp[0] - 12;
    Time = Timestamp[0] + ":" + Timestamp[1];
    Username = Chat.username;
    Message = contents;
    firebase.database().ref("conversations/" + Chat.id + "/count").once("value").then(function (snapshot)
    {
      var newNumber = snapshot.val() + 1;
      firebase.database().ref("conversations/" + Chat.id + "/" + newNumber).set(
      {
        message: Message,
        color: Chat.color,
        timestamp: Timestamp[0] + ":" + Timestamp[1],
        username: Chat.username,
        usertag: Chat.userId,
      });
      firebase.database().ref("conversations/" + Chat.id + "/count").set(newNumber);
      switch (Chat.maxMsgs)
      {
        case 50:
        {
          firebase.database().ref("conversations/" + Chat.id + "/" + newNumber - 51).remove();
          break;
        }
        case 100:
        {
          firebase.database().ref("conversations/" + Chat.id + "/" + newNumber - 101).remove();
          break;
        }
        case 150:
        {
          firebase.database().ref("conversations/" + Chat.id + "/" + newNumber - 151).remove();
          break;
        }
        case 200:
        {
          firebase.database().ref("conversations/" + Chat.id + "/" + newNumber - 201).remove();
          break;
        }
        default:
        {
          var a = 1;
          while (a !== 0)
          {
            a++;
          }
        }
      }
    });
  }
  else
  {
    return;
  }
}

function printMessage (Message, Time, Username, Color, UserId, MessageCount)
{
  if (Username !== Chat.lastUser)
  {
    _("#Chat_Pane").append('<div sv="' + MessageCount + '"></div>');
    _("$" + MessageCount).append('<h3 sv="u' + MessageCount +'">' + Username + '</h3>');
    _("$u" + MessageCount).append('<i class="time">      ' + Time + '</i>');
    _("$" + MessageCount).append('<p class="quickfade">' + Message + '</p>');
    Chat.last = MessageCount;
    Chat.lastUser = Username;
  }
  else
  {
    _("$" + Chat.last).append('<p class="quickfade">' + Message + '</p>')
  }
  document.getElementById("Chat_Pane").scrollTop = document.getElementById("Chat_Pane").scrollHeight;
}
/**
function printMessage (Message, Time, Username, Color, UserId, MessageCount)
{
  var New = true;
  if (Username == Chat.lastUser) New = false;
  if (New)
  {
    _("$chatpane").append('<div sv="' + MessageCount +'"></div>');
    _("$" + MessageCount).append('<h3 sv="u' + MessageCount +'">' + Username + '</h3>');
    _("$u" + MessageCount).append('<i class="time">      ' + Time + '</i>');
    _("$" + MessageCount).append('<p>' + Message + '</p>');
    _("$chatpane").attribute("scrolltop", _("$chatpane").attribute("scrollHeight"));
    Chat.last = MessageCount;
    Chat.lastUser = Username;
  }
  else
  {
    _("$" + Chat.last).append('<p>' + Message + '</p>');
  }
  document.getElementById("chatpane").scrollTop = document.getElementById("chatpane").scrollHeight;
}

function updateStatus (newStatus)
{
  var root = firebase.database().ref(),
      tip = root.child("conversations/" + Chat.id + "/online/" + Chat.username);
  switch (newStatus)
  {
    case "typing":
      tip.set("typing");
      break;
    case "active":
      tip.set("active");
      break;
    case "online":
      tip.set("online");
      break;
    case "offline":
      tip.remove();
      break;
  }
}

window.addEventListener("focus", function ()
{
  Chat.focus = "active";
  updateStatus ("active");
});
window.addEventListener("blur", function ()
{
  Chat.focus = "online";
  updateStatus ("online");
});
window.addEventListener("unload", function ()
{
  updateStatus ("offline");
});

(function ()
{
  var aTime = [],
      aUsername = [],
      aMessage = [],
      aColor = [],
      aUsertag = [],
      root = firebase.database().ref(),
      tip = root.child("conversations/" + Chat.id);
  tip.once("value", function (snapshot)
  {
    snapshot.forEach(function (child)
    {
      aTime[child.key] = child.val().timestamp;
      aUsername[child.key] = child.val().username;
      aMessage[child.key] = child.val().message;
      aColor[child.key] = child.val().color;
      aUsertag[child.key] = child.val().usertag;
    });
    aTime.forEach(function (val, index)
    {
      if (aTime[index] !== null) printMessage
      (
        aMessage[index],
        aTime[index],
        aUsername[index],
        aColor[index],
        aUsertag[index],
        index
      );
    });
  });
})();
*/
