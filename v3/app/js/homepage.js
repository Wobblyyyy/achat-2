var Modal =
{
  openModal: function (modalName)
  {
    setTimeout(function ()
    {
      _("#pagecover").addClass("cover");
      _("#" + modalName).setClass("modal ModalVis");
      Modal.activeModal = modalName;
      Modal.modal = true;
    }, 10);
  },
  closeModal: function (modalName)
  {
    _("#pagecover").removeClass("cover");
    _("#" + modalName).setClass("modal ModalHidden");
    Modal.modal = false;
  },
  activeModal: "",
  modal: false,
}

var Sidebar =
{
  resetSidebar: function ()
  {
    _("$Section_Chat_Sidebar").html("");
  },
  addToSidebar: function (name, id)
  {
    _("$Section_Chat_Sidebar").append('<button class="nbutton" sv="button_' + id + '">' + name + '<p class="nbutton subtext">NULL members</p></button>');
  },
}

var Window =
{
  addWindow: function (name, id)
  {
    _("$AppendHere").append('<iframe class="mainframe inview" id="' + id + '" src="chat.html?c=' + id + '"></iframe>');
  },
  removeWindow: function (id)
  {
    _("#" + id).remove();
  },
  setActive: function (id)
  {
    _("#" + id).setClass("mainframe inview");
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
  });
  snapshot.forEach(function (child)
  {
    _("$button_" + child.key).on("click", function ()
    {
      // TODO add code to handle clicking sidebar button.
      Window.setActive(child.key);
      var elements = document.getElementsByClassName("mainframe inview"), i;
      for (i = 0, i < elements.length; i++;)
      {
        elements[i].classList.remove("inview");
        elements[i].classList.add("hidden");
      }
    });
  })
});

_("#signout").on("click", function ()
{
  window.location.href = "../logout.html";
});

_("#pagecover").on("click", function ()
{
  if (Modal.modal) Modal.closeModal(Modal.activeModal);
});

_("$button_group_options").on("click", function ()
{
  Modal.openModal("group_options");
});