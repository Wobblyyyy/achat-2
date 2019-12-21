var lastMessage = "";

_("$Chat_Textbox").on("keydown", function (key)
{
  if (key.keyCode == "38") _("$Chat_Textbox").value(lastMessage);
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
  lastMessage = contents;
  contents = fixMessage(contents.trim().replaceAll("<", "<i></i><<i></i>"));
  if (contents.length >= 1)
  {
    if (contents.charAt(0) == "/")
    {
      eval(contents.substr(1));
      return;
    }
    var Time = new Date();
    var Timestamp =
    [
      Time.getHours(),
      Time.getMinutes().toString(),
      Time.getMonth(),
      Time.getDate(),
    ];
    switch (Timestamp[2])
    {
      case 1:
        Timestamp[2] = "January";
        break;
      case 2:
        Timestamp[2] = "February";
        break;
      case 3:
        Timestamp[2] = "March";
        break;
      case 4:
        Timestamp[2] = "April";
        break;
      case 5:
        Timestamp[2] = "May";
        break;
      case 6:
        Timestamp[2] = "June";
        break;
      case 7:
        Timestamp[2] = "July";
        break;
      case 8:
        Timestamp[2] = "August";
        break; 
      case 9:
        Timestamp[2] = "September";
        break;
      case 10:
        Timestamp[2] = "October";
        break;
      case 11:
        Timestamp[2] = "November";
        break;
      case 12:
        Timestamp[2] = "December";
        break;
    }
    if (Timestamp[1].length == 1) Timestamp[1] = "0" + Timestamp[1];
    if (Timestamp[0] > 12) Timestamp[0] = Timestamp[0] - 12;
    Time = Timestamp[0] + ":" + Timestamp[1];
    Time = Timestamp[2] + " " + Timestamp[3] + ", " + Time;
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
        usertag: Chat.userId,
      });
      firebase.database().ref("conversations/" + Chat.id + "/count").set(newNumber);
      var old;
      switch (Chat.maxMsgs)
      {
        case 50:
        {
          old = newNumber - 51;
          firebase.database().ref("conversations/" + Chat.id + "/" + old).remove();
          break;
        }
        case 100:
        {
          old = newNumber - 101;
          firebase.database().ref("conversations/" + Chat.id + "/" + old).remove();
          break;
        }
        case 150:
        {
          old = newNumber - 151;
          firebase.database().ref("conversations/" + Chat.id + "/" + old).remove();
          break;
        }
        case 200:
        {
          old = newNumber - 201;
          firebase.database().ref("conversations/" + Chat.id + "/" + old).remove();
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

/**
 * TODO
 * Finish implementing the display details functionality
 * Make sure it works on all types of messages, whether new o rnot
 */

function printMessage (Message, Time, Username, Color, UserId, MessageCount)
{
  var RecTime = Date.now();
  console.log(RecTime);
  if (Username !== Chat.lastUser)
  {
    _("#Chat_Pane").append('<div sv="' + MessageCount + '"></div>');
    _("$" + MessageCount).append('<h3 sv="u' + MessageCount +'">' + Username + '</h3>');
    _("$u" + MessageCount).append('<i class="time">      ' + Time + '</i>');
    _("$" + MessageCount).append('<p onclick="displayDetails(\'' + Message + '\', \'' + Time + '\', \'' + Username + '\', \'' + Color + '\', \'' + UserId + '\', \'' + MessageCount + '\', ' + '\'' + RecTime + '\'' + ')" class="quickfade">' + Message + '</p>');
    Chat.last = MessageCount;
    Chat.lastUser = Username;
  }
  else
  {
    _("$" + Chat.last).append('<p onclick="displayDetails(\'' + Message + '\', \'' + Time + '\', \'' + Username + '\', \'' + Color + '\', \'' + UserId + '\', \'' + MessageCount + '\', ' + '\'' + RecTime + '\'' + ')" class="quickfade">' + Message + '</p>');
  }
  document.getElementById("Chat_Pane").scrollTop = document.getElementById("Chat_Pane").scrollHeight;
}

(function ()
{
  var Arrays =
  {
    Time: [],
    Username: [],
    Message: [],
    Color: [],
    Usertag: [],
  }
  firebase.database().ref("conversations/" + Chat.id).once("value", function (snapshot)
  {
    snapshot.forEach(function (child)
    {
      Arrays.Time[child.key] = child.val().timestamp;
      Arrays.Username[child.key] = child.val().username;
      Arrays.Message[child.key] = child.val().message;
      Arrays.Color[child.key] = child.val().color;
      Arrays.Usertag[child.key] = child.val().usertag;
    });
    Arrays.Time.forEach(function (val, index)
    {
      if (Arrays.Time !== null)
      {
        printMessage
        (
          Arrays.Message[index],
          Arrays.Time[index],
          Arrays.Username[index],
          Arrays.Color[index],
          Arrays.Usertag[index],
          index
        );
      }
    });
  });
})();

function displayDetails (Message, Time, Username, Color, UserId, MessageCount, RecTime)
{
  console.log(RecTime);
  if (Message.length > 100) Message = "see chat"
  swal.fire
  (
    "message details...",
    "<b>contents: </b>" + Message + "<br>" +
    "<b>timestamp: </b>" + Time + "<br>" +
    "<b>username: </b>" + Username + "<br>" +
    "<b>user's name color: </b>" + Color + "<br>" +
    "<b>user's user-id: </b>" + UserId + "<br>" +
    "<b>message origin number: </b>" + MessageCount + "<br>" +
    "<b>time recieved: </b>" + RecTime,
    "info",
    {
      button: "dismiss",
    }
  );
}
