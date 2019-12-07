function Chat() {}

String.prototype.replaceAll=function(s, r){var t = this;return t.replace(new RegExp(s, 'g'), r);};

var url = new URLSearchParams(document.location.search);
Chat.focus = "active";
Chat.username = Cookies.get("username");
Chat.id = url.get("c");
Chat.color = 1;
Chat.userId = 1;

(function ()
{
  _("@").append('<div sv="chatpane" id="chatpane" class="chatpane"></div>');
  _("@").append('<iframe class="iframe" sv="iframe"></iframe>');
  _("$iframe").attribute("src", "online.html?c=" + Chat.id);
  _("@").append('<div class="chatbox_background" sv="chatbox_container"></div>');
  _("$chatbox_container").append('<div class="chatbox_effects" sv="chatbox_effects"></div>');
  _("$chatbox_effects").append('<input type="text" sv="chatbox">');
  _("$chatbox").setClass("chatbox");
  _("$chatbox").attribute("placeholder", "begin typing a message... or not...");
  _("$chatbox").attribute("autocomplete", "off");
})();

_("$chatbox").on("keypress", function (e)
{
  if (e.key === "Enter")
  {
    uploadMessage(_("$chatbox").value());
    _("$chatbox").value("");
  }
});

_("$chatbox").on("input", function ()
{
  if (_("$chatbox").value().length > 0)
  {
    updateStatus ("typing");
  }
  else
  {
    updateStatus ("active");
  }
});

firebase.database().ref("conversations/" + Chat.id + "/count").on("value", function (snapshot)
{
  setTimeout (function ()
  {
    if (Chat.focus == "online")
    {
      updateStatus ("online");
    }
    else 
    {
      updateStatus ("active");
    }
  }, 1);
  var Time, Username, Message, Color, Usertag, Count = snapshot.val();
  firebase.database().ref("conversations/" + Chat.id + "/" + Count).once("value", function (snapshot)
  {
    Time = snapshot.val().timestamp;
    Username = snapshot.val().username;
    Message = snapshot.val().message;
    Color = snapshot.val().color;
    Usertag = snapshot.val().usertag;
    printMessage (Message, Time, Username, Color, Usertag, Count);
  });
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

function fixMessage(e){for(;e.includes("  ");)e=e.replace("  "," ");for(;e.includes("***");)e=(e=e.replace("***","<b><i>")).replace("***","</b></i>");for(;e.includes("**");)e=(e=e.replace("**","<i>")).replace("**","</i>");for(;e.includes("*");)e=(e=e.replace("*","<b>")).replace("*","</b>");return e;}

function uploadMessage (contents)
{
  contents = contents.trim();
  contents = contents.replaceAll("<", "<i></i><<i></i>");
  contents = fixMessage(contents);
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
        timestamp: Time,
        username: Chat.username,
        usertag: Chat.userId
      });
      firebase.database().ref("conversations/" + Chat.id + "/count").set(newNumber);
      firebase.database().ref("conversations/" + Chat.id + "/online").remove();
      firebase.database().ref("conversations/" + Chat.id + "/" + newNumber - 101).remove();
    });
  }
  else
  {
    return;
  }
}

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