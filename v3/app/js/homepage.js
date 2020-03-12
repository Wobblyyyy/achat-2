var GroupMap = {}

var Modal =
{
  openModal: function (modalName)
  {
    setTimeout(function ()
    {
      _("#pagecover").addClass("cover");
      _("#" + modalName).setClass("modal ModalVis");
      if (modalName == "group_create")
      {
        printUserList();
        drawGroupModal();
      }
      Modal.activeModal = modalName;
      Modal.modal = true;
    }, 10);
  },
  closeModal: function (modalName)
  {
    _("#pagecover").removeClass("cover");
    _("#" + modalName).setClass("modal ModalHidden");
    Modal.modal = false;
    closeGroupModal();
  },
  activeModal: "",
  modal: false,
}

var Sidebar =
{
  resetSidebar: function ()
  {
    _("$Section_Chat_Sidebar").html('<div class="v3p-abs" style="height: 7vh;"></div>');
  },
  addToSidebar: function (name, id)
  {
    _("$Section_Chat_Sidebar").append('<button class="nbutton v3a-bg" sv="button_' + id + '">' + name + '<p class="nbutton subtext" sv="nbutton_subtext_' + id + '">group chat</p></button>');
    firebase.database().ref("conversations/" + id + "/count").on("value", function (snapshot)
    {
      firebase.database().ref("conversations/" + id + "/" + snapshot.val()).once("value", function (mini)
      {
        var s = mini.val().username + ": " + mini.val().message;
        if (s.length > 50)
        {
          s = s.substring(0, 50);
          s += "...";
        }
        _("$nbutton_subtext_" + id).html(s);
      });
    });
  },
  setActive: function (id)
  {
    _("$" + id).addClass("active");
  }
}

class Group
{
  name = "";
  id = "";
}

var Window =
{
  addWindow: function (name, id)
  {
    _("$AppendHere").append('<iframe class="mainframe hidden" id="' + id + '" src="chat.html?c=' + id + '"></iframe>');
  },
  removeWindow: function (id)
  {
    _("#" + id).remove();
  },
  setActive: function (id)
  {
    _("#" + id).setClass("mainframe inview");
    Cookies.set("lastchat", id, { expires: 365, });
    _("$ChatTitle").html(GroupMap[id])
  },
  hide: function (id)
  {
    _("#" + id).setClass("mainframe hidden");
  },
}

firebase.database().ref("users/" + Cookies.get("username") + "/groups").on("value", function (snapshot)
{
  Sidebar.resetSidebar();
  snapshot.forEach(function (child)
  {
    Sidebar.addToSidebar(child.val(), child.key);
    Window.addWindow(child.val(), child.key);
    GroupMap[child.key] = child.val();
  });
  snapshot.forEach(function (child)
  {
    _("$button_" + child.key).on("click", function ()
    {
      var elements = document.getElementsByClassName("mainframe");
      for (var i = 0; i < elements.length; i++)
      {
        elements[i].classList.remove("inview");
        elements[i].classList.add("hidden");
      }
      Window.setActive(child.key);
      elements = document.getElementsByClassName("nbutton");
      for (var i = 0; i < elements.length; i++)
      {
        elements[i].classList.remove("active");
      }
      Sidebar.setActive("button_" + child.key);
    });
  });
});

_("#pagecover").on("click", function ()
{
  if (Modal.modal) Modal.closeModal(Modal.activeModal);
});

_("$button_group").on("click", function ()
{
  Modal.openModal("group_create");
});

setTimeout(function ()
{
  var elements = document.getElementsByClassName("mainframe");
  for (var i = 0; i < elements.length; i++)
  {
    elements[i].classList.remove("inview");
    elements[i].classList.add("hidden");
  }
  Window.setActive(Cookies.get("lastchat"));
  elements = document.getElementsByClassName("nbutton");
  for (var i = 0; i < elements.length; i++)
  {
    elements[i].classList.remove("active");
  }
  Sidebar.setActive("button_" + Cookies.get("lastchat"));
}, 2000);

var userArray = [""], addUserArray = [];

function printUserList ()
{
  firebase.database().ref("users/").once("value", function (snapshot)
  {
    snapshot.forEach(function (child)
    {
      if (child.key !== "count" && !userArray.includes(child.key)) userArray.push(child.key);
    });
  });
}

function drawGroupModal ()
{
  setInterval(function ()
  {
    var t = false;
    _("$userfound").html("");
    userArray.forEach(function (value, index)
    {
      if (value.includes(_("$usersearch").value()))
      {
        if (!addUserArray.includes(value))
        {
          _("$userfound").append('<p class="v3fi" sv="tgrpm_' + value + '">' + value + '</p>');
          t = true;
        }
      }
    });
    if (!userArray.includes(_("$usersearch").value()) && !t)
    {
      _("$userfound").append('<p class="v3fi">' + "no results" + "</p>");
    }
  }, 100);
  _("$usersearch").on("keydown", function (key)
  {
    if (userArray.includes(_("$usersearch").value()))
    {
      if (!(_("$userlist").html().includes(">" + _("$usersearch").value() + "</p>")))
      {
        if (key.key === "Enter")
        {
          createGroup.addUser(_("$usersearch").value());
          _("$usersearch").value("");
        }
      }
    }
  });
  _("$groupname").on("keydown", function (key)
  {
    if (key.key === "Enter")
    {
      if (!addUserArray.includes(Cookies.get("username")))
      {
        addUserArray.push(Cookies.get("username"));
      }
      createGroup.createGroup();
      closeGroupModal();
    }
  });
}

function dec2hex(r){return("0"+r.toString(16)).substr(-2)}function generateId(r){var n=new Uint8Array((r||40)/2);return window.crypto.getRandomValues(n),Array.from(n,dec2hex).join("")}

var createGroup =
{
  addUser: function (user)
  {
    _("$userlist").append('<p class="v3fi">' + user + '</p');
    addUserArray.push(user);
  },
  resetGroupList: function ()
  {
    _("$userlist").html("");
    addUserArray = [];
  },
  createGroup: function ()
  {
    var gid = generateId(50);
    addUserArray.forEach(function (value)
    {
      if (!value == "" && _("$groupname").value().length > 0 && _("$groupname").value().length < 15)
      {
        firebase.database().ref("users/" + value + "/groups/" + gid).set(_("$groupname").value());
      }
      else
      {
        alert ("group name can't be empty or more than 15 characters");
      }
    });
  }
}

function closeGroupModal ()
{
  clearInterval();
  Modal.closeModal("group_create");
}

_("$resetgroup").on("click", function ()
{
  createGroup.resetGroupList();
});

_("$creategroup").on("click", function ()
{
  if (!addUserArray.includes(Cookies.get("username")))
  {
    addUserArray.push(Cookies.get("username"));
  }
  createGroup.createGroup();
  closeGroupModal();
});

 /**
  * SHAYS REBELLION POINTS TO THE FACT THAT THE ARTICLES OF CONFEDERATION ARE NOT WORKING AND WE NEED A STRONGER NATIONAL GOVERNMENT
  */

firebase.database().ref("users/" + Cookies.get("username") + "/tokens").on("value", function (snapshot)
{
  var current = parseInt(_("$TokensCount").html());
  var next = Math.floor(snapshot.val());
  var distance = next - current;
  var transitionTime = 500; // in ms
  var timeSpace = Math.floor(transitionTime / distance);
  var interval = setInterval(function ()
  {
    if (parseInt(_("$TokensCount").html()) == next)
    {

    }
    else
    {
      _("$TokensCount").html(parseInt(_("$TokensCount").html()) + 1);
    }
  }, timeSpace);
  setTimeout(function ()
  {
    _("$TokensCount").html(next);
    clearInterval(interval);
  }, transitionTime);
});